import { Component } from '@angular/core';
import { IDictionary } from './Interfaces/IDictionary';
import { DictionaryService } from './Services/DictionaryService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = "Stu's silly dictionary app";
  dictionaries: IDictionary[] = [];
  errorMessage: string = "";
  activeOption: boolean[] = [];
  closeResult = '';
  newDictionaryName: string = "";
  dictionaryID = "";
  constructor(private dictionaryService: DictionaryService,
    private modalService: NgbModal) { };


  ngOnInit(): void {
    this.updateDictionaries();
  }

  private updateDictionaries(): void {
    this.dictionaryService.getDictionaries().subscribe({
      next: (dictionaries) => {
        this.dictionaries = dictionaries;
        this.activeOption = Array(this.dictionaries.length).fill(false);
      },
      error: err => this.errorMessage = err
    });
  }

  public selectDictionary(id: string): void {
    for (let dictCount = 0; dictCount < this.dictionaries.length; dictCount++) {
      if (this.dictionaries[dictCount].id == id) {
        this.dictionaries[dictCount].isActive = true;
      }
      else {
        this.dictionaries[dictCount].isActive = false;
      }
    }
    this.dictionaryID = id;
  }

  deleteDictionary(id: string): void {
    this.dictionaryService.deleteDictionary(id).subscribe(
      {
        next: (res) => this.updateDictionaries(),
        error: (err) => this.closeResult = "Error :" + err,
      }
    );
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.dictionaryService.addDictionary(this.newDictionaryName).subscribe(
          {
            next: (res) => this.updateDictionaries(),
            error: (err) => this.closeResult = "Error :" + err,
          }
        )
      },
    );
  }
}
