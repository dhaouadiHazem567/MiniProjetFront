import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Contact} from "../models/Contact";
import {Activity} from "../models/Activity";
import {ContactDTO} from "../models/ContactDTO";
import {Observable} from "rxjs";
import {ActivityDTO} from "../models/ActivityDTO";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  getActivities(){
    return this.http.get<Activity[]>("http://localhost:8080/activities/getAllActivities");
  }

  createActivity(activity: ActivityDTO): Observable<Contact> {
    const formData = new FormData();
    formData.append('contactJson', JSON.stringify(activity));
    return this.http.post<Contact>("http://localhost:8080/activities/addActivity", formData);
  }

  deleteActivity(id: number):Observable<string> {
    return this.http.delete<string>(`http://localhost:8080/activities/deleteActivity/${id}`);
  }
}
