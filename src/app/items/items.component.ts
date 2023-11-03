import { Component, Input } from '@angular/core';
import { DictionaryService } from '../Services/DictionaryService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  @Input() dictionaryID: string = "";
  selectedItemID: string = ""
  errorMessage: string = "";

  constructor(private dictionaryService: DictionaryService,
    private modalService: NgbModal) { };

  newKey: string = "";
  newMessage: string = "";

  updateSelectedItem(newSelectedItemID: string): void {
    this.selectedItemID = newSelectedItemID;
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.dictionaryService.addItem(this.dictionaryID, this.newKey, this.newMessage).subscribe(
          {
            next: (res) => { //There has to be a better way to force a refresh
              let hackHold = this.selectedItemID;
              this.selectedItemID = "";
              this.selectedItemID = hackHold;
            },
            error: (err) => this.errorMessage = "Error :" + err,
          }
        )
      },
    );
  }
}
