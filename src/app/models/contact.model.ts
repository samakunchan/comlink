export interface IContact {
  moral: boolean;
  civilite: string;
  nom: string;
  prenom: string;
  email: string;
  num_voie: number;
  num_voie_suffixe: number; //
  id_type_voie: number;
  adresse: string;
  adresse_comp: string;
  id_city: number; //
  telephone: string;
  mobile: string;
  fax: string;
  created_at?: {
    date: string,
    timezone: string,
    timezone_type: number
  };
  updated_at?: {
    date: string,
    timezone: string,
    timezone_type: number
  };
  deleted_at?: {
    date: string,
    timezone: string,
    timezone_type: number
  };
  display_name: string;
  id?: number;
  id_cabinet?: number;
  clear(): void;
}

export class Contact implements IContact {
  public moral: boolean;
  public civilite: string;
  public nom: string;
  public prenom: string;
  public email: string;
  public num_voie: number;
  public num_voie_suffixe: number;
  public id_type_voie: number;
  public adresse: string;
  public adresse_comp: string;
  public id_city: number;
  public telephone: string;
  public mobile: string;
  public fax: string;
  public display_name: string;

  clear(): void {
    this.moral = false;
    this.civilite = '';
    this.nom = '';
    this.prenom = '';
    this.email = '';
    this.num_voie = null;
    this.num_voie_suffixe = null;
    this.id_type_voie = null;
    this.adresse = '';
    this.adresse_comp = '';
    this.id_city = 0;
    this.telephone = '';
    this.mobile = '';
    this.fax = '';
  }
}
// "moral": false,
//   "civilite": "mr",
//   "prenom": "Prénom",
//   "nom": "Nom",
//   "email": "adresse@email.com",
//   "num_voie": null,
//   "num_voie_suffixe": null,
//   "id_type_voie": null,
//   "adresse": null,
//   "adresse_comp": null,
//   "id_city": 0,
//   "telephone": null,
//   "mobile": null,
//   "fax": null
