import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Contact, IContact} from '../../../models/contact.model';
import {ContactService} from '../../../services/contact.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ajout-contact',
  templateUrl: './ajout-contact.component.html',
  styleUrls: ['./ajout-contact.component.css']
})
export class AjoutContactComponent implements OnInit {

  contactForm: FormGroup;
  typeDeVoieList = ['RUE', 'ALLEE', 'BD', 'CHEMIN', 'CITE', 'LOT', 'RES'];
  typeCivilite = ['mr', 'mrs'];
  constructor(private formBuilder: FormBuilder, private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.initContactForm();
  }

  /**
   * NB: J'ai pas mis les Validators.required. J'attends de voir le projet complet
   */
  initContactForm(): void {
    this.contactForm = this.formBuilder.group({
      civilite: [this.typeCivilite[0], Validators.compose([Validators.required])],
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
    const contact: IContact = new Contact();
    contact.clear();
    const newContact = {
      ...contact,
      ...this.contactForm.value
    };
    this.contactService.addContact(newContact).subscribe(() => {
        console.log('Contact Ajouter');
        this.router.navigateByUrl('/');
      },
      () => alert('Un problème est survenu lors de la mise à jour des données'));
  }
}
