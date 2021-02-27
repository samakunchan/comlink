import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {IContact} from '../models/contact.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactSubject = new BehaviorSubject<IContact[]>([]);
  contact$: Observable<IContact[]> = this.contactSubject.asObservable();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `bearer ${environment.token}`
    })
  };

  constructor(private httpClient: HttpClient) {
    this.loadAllContacts();
  }

  private loadAllContacts(): void {
    this.httpClient.get<IContact[]>(`${environment.domain}/contacts`, this.httpOptions)
      .pipe(
        map(contacts => {
          const listContact = contacts.map((contact: IContact) => {
            const createdAt = contact.created_at.date.split(' ');
            const updatedAt = contact.updated_at.date.split(' ');
            const newFormatCreatedAt = createdAt[0] + 'T' + createdAt[1].replace('.000000', '');
            const newFormatUpdatedAt = updatedAt[0] + 'T' + updatedAt[1].replace('.000000', '');
            const contactReformater: IContact = {
              ...contact,
              ...{created_at: {...contact.created_at, date: newFormatCreatedAt}},
              ...{updated_at: {...contact.updated_at, date: newFormatUpdatedAt}}
            };
            return contactReformater ;
          });
          this.contactSubject.next(listContact);
        }),
        catchError(err => throwError(err))
      ).subscribe();
  }

  getContact(id: number): Observable<IContact> {
    return this.contact$.pipe(
      map((contacts: IContact[]) => contacts.filter(contact => contact.id === id)[0]),
      catchError(err => throwError(err))
    );
  }

  addContact(contact: IContact): Observable<IContact> {
    return this.httpClient.post<IContact>(`${environment.domain}/contacts`, contact, this.httpOptions).pipe(
      tap((res: IContact) => {
        const newArray = this.contactSubject.getValue().concat([res]);
        this.contactSubject.next(newArray);
      }),
      catchError(err => throwError(err))
    );
  }

  editContact(id: number, contact: IContact): Observable<IContact> {
    const currentDataContact = this.contactSubject.getValue();
    const index = currentDataContact.findIndex(res => res.id === id);
    const newContact = {
      ...currentDataContact[index],
      ...contact
    };
    const listContact: IContact[] = currentDataContact.slice(0);
    listContact[index] = newContact;

    return this.httpClient.patch<IContact>(`${environment.domain}/contacts/${id}`, contact, this.httpOptions).pipe(
      tap(() => this.contactSubject.next(listContact)),
      catchError(err => throwError(err))
    );
  }

  deleteContact(id: number): Observable<IContact> {
    const contact = this.contactSubject.getValue();
    const index = contact.findIndex(res => res.id === id);
    contact.splice(index, 1);
    return this.httpClient.delete<IContact>(`${environment.domain}/contacts/${id}`, this.httpOptions).pipe(
      tap(() => this.contactSubject.next(contact)),
      catchError(err => throwError(err))
    );
  }
}
