import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {IContact} from '../../../models/contact.model';
import {ContactService} from '../../../services/contact.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {

  headers = ['Nom', 'Prénom', 'Adresse', 'Email', 'Tel', 'Créé le', 'Dernière modification', 'Actions'];
  contact$: Observable<IContact[]>;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contact$ = this.contactService.contact$.pipe(
      map((contacts: IContact[]) => {
        return contacts.map((contact: IContact) => {
          const createdAt = contact.created_at.date.split(' ');
          const updatedAt = contact.updated_at.date.split(' ');
          const newFormatCreatedAt = createdAt[0] + 'T' + createdAt[1].replace('.000000', '');
          const newFormatUpdatedAt = updatedAt[0] + 'T' + updatedAt[1].replace('.000000', '');
          const contactReformater: IContact = {
            ...contact,
            ...{created_at: {...contact.created_at, date: newFormatCreatedAt}},
            ...{updated_at: {...contact.updated_at, date: newFormatUpdatedAt}}
          };
          console.log(contactReformater);
          return contactReformater ;
        });
      })
    );
  }

  onDelete(id: number): void {
    this.contactService.deleteContact(id).subscribe(() => {
        console.log('Contact supprimer');
      },
      () => alert('Un problème est survenu lors de la mise à jour des données'));
  }

}
