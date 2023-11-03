import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IItem } from '../../Interfaces/IItem';
import { DictionaryService } from '../../Services/DictionaryService';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  @Input() dictionaryID: string = "";
  @Output() childSelectItem = new EventEmitter<string>();
  items: IItem[] = [];
  activeOption: { [id: string]: boolean } = {};
  errorMessage: string = "";
  itemID: string = "";

  constructor(private dictionaryService: DictionaryService) { };


  ngOnChanges(): void {
    if (this.dictionaryID != "") {
      this.updateItems();
    }
  }

  selectItem(itemID: string): void {
    for (let key in this.activeOption) {
      if (itemID == key) {
        this.activeOption[key] = true;
        this.itemID = key;
      }
      else {
        this.activeOption[key] = false;
      }
    }
    this.childSelectItem.emit(itemID);
  }

  updateItems(): void {
    this.dictionaryService.getItems(this.dictionaryID).subscribe({
      next: (items) => {
        this.items = items;
        this.activeOption = {};
        for (var itemCount = 0; itemCount < items.length;  itemCount++) {
          this.activeOption[items[itemCount].id] = false;
        }
      },
      error: err => this.errorMessage = err
    });
  }
}
