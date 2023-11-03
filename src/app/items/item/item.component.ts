import { Component, Input } from '@angular/core';
import { IItem } from '../../Interfaces/IItem';
import { DictionaryService } from '../../Services/DictionaryService';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() itemID: string = "";
  item: IItem = { id: "", key: "", message: "" };
  errorMessage: string = "";

  constructor(private dictionaryService: DictionaryService) { };

  ngOnInit(): void {
    this.errorMessage = "Loading";
    this.updateItem();
  }
  ngOnChanges(): void {
    this.errorMessage = "Loading";
    this.updateItem();
  }

  updateItem(): void {
    if (this.itemID != "") {
      this.dictionaryService.getItem(this.itemID).subscribe({
        next: (item) => {
          this.item = item;
          this.errorMessage = ""
        },
        error: err => this.errorMessage = err
      });
    }
  }

}
