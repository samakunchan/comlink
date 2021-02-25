import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {IContact} from '../../../models/contact.model';
import {ContactService} from '../../../services/contact.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {

  headers = ['Nom', 'Prénom', 'Adresse', 'Email', 'Tel', 'Créé le', 'Dernière modification', 'Actions'];
  contact$: Observable<IContact[]>;

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.contact$ = this.contactService.contact$;
  }

  onDelete(id: number): void {
    this.contactService.deleteContact(id).subscribe(() => {
        console.log('Contact supprimer');
        this.router.navigateByUrl('/');
      },
      () => alert('Un problème est survenu lors de la mise à jour des données'));
  }

}
