import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IItem } from '../../Interfaces/IItem';
import { DictionaryService } from '../../Services/DictionaryService';

@Component({
  selector: 'app-item-list-item',
  templateUrl: './item-list-item.component.html',
  styleUrls: ['./item-list-item.component.css']
})
export class ItemListItemComponent {
  @Input() itemID: string = "";
  @Input() active: boolean = false;
  @Output() childSelectItem = new EventEmitter<string>();
  @Output() deletedItem = new EventEmitter<string>();
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
    this.dictionaryService.getItem(this.itemID).subscribe({
      next: (item) => {
        this.item = item;
        this.errorMessage = ""
      },
      error: err => this.errorMessage = err
    });
  }

  selectItem(itemID: string): void {
    this.childSelectItem.emit(itemID);
  }

  deleteItem(itemID: string) : void {
    this.dictionaryService.deleteItem(itemID).subscribe(
      {
        next: (res) => this.deletedItem.emit(),
        error: (err) => this.errorMessage = "Error :" + err,
      }
    );
  }
}
