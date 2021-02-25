import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../../services/contact.service';
import {IContact} from '../../../models/contact.model';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contactEditForm: FormGroup;
  contact$: Observable<IContact>;
  typeDeVoieList = ['RUE', 'ALLEE', 'BD', 'CHEMIN', 'CITE', 'LOT', 'RES'];
  typeCivilite = ['mr', 'mrs'];
  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initContactEditForm();
    const id = this.route.snapshot.params.id;
    this.contact$ = this.contactService.getContact(+id);
  }

  initContactEditForm(): void {
    this.contactEditForm = this.formBuilder.group({
      civilite: ['', Validators.compose([Validators.required])],
      nom: ['', Validators.compose([Validators.maxLength(255)])],
      prenom: ['', Validators.compose([Validators.maxLength(255)])],
      id_type_voie: [''],
      num_voie: [''],
      adresse: ['', Validators.compose([Validators.maxLength(255)])],
      adresse_comp: ['', Validators.compose([Validators.maxLength(255)])],
      email: ['', Validators.compose([Validators.maxLength(255)])],
      telephone: ['', Validators.compose([Validators.maxLength(20)])],
      mobile: ['', Validators.compose([Validators.maxLength(20)])],
      fax: ['', Validators.compose([Validators.maxLength(20)])],
      moral: [false, Validators.compose([Validators.required])]
    });
  }

  onSubmit(): void {
    const changes = this.contactEditForm.value;
    const id = this.route.snapshot.params.id;
    this.contactService.editContact(+id, changes).subscribe(
      () => {
      console.log('Contact modifier');
      this.router.navigateByUrl('/');
    },
      () => alert('Un problème est survenu lors de la mise à jour des données'));
  }

}
