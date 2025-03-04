import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Contact} from "../models/Contact";
import {JobTitle} from "../enums/JobTitle";
import {Observable} from "rxjs";
import {ContactDTO} from "../models/ContactDTO";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getContacts(){
    return this.http.get<Contact[]>("http://localhost:8080/contacts/getAllContacts");
  }

  editContact(idContact: number, selectedJobTitle: JobTitle): Observable<Contact> {
    return this.http.put<Contact>(`http://localhost:8080/contacts/updateJobTitle/${idContact}/${selectedJobTitle}`,{});
  }

  deleteContact(id: number):Observable<string> {
    return this.http.delete<string>(`http://localhost:8080/contacts/deleteContact/${id}`);
  }

  createContact(contact: ContactDTO, photo: File | null): Observable<Contact> {
    const formData = new FormData();
    formData.append('contactJson', JSON.stringify(contact));
    if (photo) {
      console.log(photo.name);
      formData.append('photo', photo, photo.name);
    }
    return this.http.post<Contact>("http://localhost:8080/contacts/createContact", formData);
  }

}
