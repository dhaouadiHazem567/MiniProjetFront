import {Component, OnInit} from '@angular/core';
import {Activity} from "../../../../models/Activity";
import {ActivityService} from "../../../../services/activity.service";
import {TypeActivity} from "../../../../enums/TypeActivity";
import {MessageService} from "primeng/api";
import {AdminService} from "../../../../services/admin.service";
import {Contact} from "../../../../models/Contact";
import {ActivityDTO} from "../../../../models/ActivityDTO";
import {finalize} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent implements OnInit{

  activities!: Activity[];
  filteredActivities!: Activity[];
  selectedActivity!: Activity;
  displayEditModal!: boolean;
  activityTypes: TypeActivity[] = Object.values(TypeActivity);
  contacts!: Contact[];
  contactOptions!: string[];
  displayAddModal!: boolean;
  newActivity!: ActivityDTO;

  searchTerm: string = '';
  searchOptions = [
    { label: 'Type', value: 'typeActivity' },
    { label: 'Date', value: 'date' },
  ];
  selectedSearchField: string = this.searchOptions[0].value;

  constructor(private activityService: ActivityService, private messageService: MessageService
          , private adminService: AdminService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.getActivities();
    this.getContacts();
    this.newActivity = new ActivityDTO();
    this.selectedActivity = new Activity();
  }

  getActivities(){
    this.activityService.getActivities().subscribe(
      (data: Activity[]) => {this.activities = data;
        this.filteredActivities = data;
        console.log(this.activities);
      },
    )
  }

  getContacts(){
    this.adminService.getContacts().subscribe(
      (data: Contact[]) => {this.contacts = data;
      },
    )
  }

  addActivity() {
    this.newActivity = new ActivityDTO();
    this.displayAddModal = true;
  }

  editActivity(activity: Activity) {
    this.contactOptions = this.contacts.filter(contact => contact.username !== null || typeof contact.username !== 'undefined')
      .map(contact => contact.username);
    console.log(activity);
    this.selectedActivity = {...activity};
    this.displayEditModal = true;
  }

  deleteActivity(id: number) {
    this.activityService.deleteActivity(id).pipe(
      finalize(() => {this.getActivities();
        this.showSuccess('Activity deleted successfully.');
      })
    ).subscribe(
      () => {console.log('Activity deleted successfully');
      }
      ,
      error => console.error('Error deleting activity', error)
    );
  }

  saveActivity() {

  }

  showSuccess(content: string) {
    this.messageService.add({severity: 'success', summary: 'Success', detail: content});
  }

  showError(content: string) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: content});
  }

  postActivity() {
    console.log(this.newActivity);
    this.newActivity.date = new Date(this.newActivity.date.toISOString().slice(0,10));
    this.activityService.createActivity(this.newActivity).subscribe(
      response => {
        console.log('Activity created successfully', response);
        this.showSuccess('Activity created successfully');
        this.newActivity = new ActivityDTO();
        this.displayAddModal = false;
        this.getActivities();
      },
      error => {
        this.showError('Error');
      }
    );
  }

  filterActivities() {
    this.filteredActivities = this.activities.filter(activity => {
      const term = this.searchTerm.toLowerCase();
      switch (this.selectedSearchField) {
        case 'date':
          return activity.date.toString().includes(term);
        case 'typeActivity':
          return activity.typeActivity.toLowerCase().includes(term);
        default:
          return false;
      }
    });
  }
}
