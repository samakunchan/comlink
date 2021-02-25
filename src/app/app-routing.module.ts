import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import {AjoutContactComponent} from './pages/contact/ajout-contact/ajout-contact.component';
import {ListContactComponent} from './pages/contact/list-contact/list-contact.component';
import {EditContactComponent} from './pages/contact/edit-contact/edit-contact.component';

const routes: Routes = [
  { path: '', component: ListContactComponent},
  { path: 'edit-contact/:id', component: EditContactComponent},
  { path: 'ajout-contact', component: AjoutContactComponent},
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '**', redirectTo: ''},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
