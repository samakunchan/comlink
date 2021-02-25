import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { ContactComponent } from './pages/contact/contact.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import { AjoutContactComponent } from './pages/contact/ajout-contact/ajout-contact.component';
import { ListContactComponent } from './pages/contact/list-contact/list-contact.component';
import { EditContactComponent } from './pages/contact/edit-contact/edit-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    AjoutContactComponent,
    ListContactComponent,
    EditContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
