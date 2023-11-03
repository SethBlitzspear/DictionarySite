import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListItemComponent } from './item-list-item.component';

describe('ItemListItemComponent', () => {
  let component: ItemListItemComponent;
  let fixture: ComponentFixture<ItemListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemListItemComponent]
    });
    fixture = TestBed.createComponent(ItemListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
