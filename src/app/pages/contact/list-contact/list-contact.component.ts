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
        contacts.map(res => {
          const arr = res.created_at.date.split(' ');
          return arr[0] + 'T' + arr[1].replace('.000000', '') ;
        });
        return contacts;
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
