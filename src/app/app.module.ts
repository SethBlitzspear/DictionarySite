import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemsComponent } from './items/items.component';
import { ItemListItemComponent } from './items/item-list-item/item-list-item.component';
import { ItemComponent } from './items/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemsComponent,
    ItemListItemComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
