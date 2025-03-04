import {Component, OnInit} from '@angular/core';
import {Contact} from "../../../../models/Contact";
import {AuthService} from "../../../../services/auth.service";
import {AdminService} from "../../../../services/admin.service";
import {MessageService} from "primeng/api";
import {JobTitle} from "../../../../enums/JobTitle";
import {finalize} from "rxjs";
import {Country} from "../../../../enums/Country";
import {ContactDTO} from "../../../../models/ContactDTO";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  contacts!: Contact[];
  selectedContact!: Contact;
  displayEditModal!: boolean;
  jobTitles = Object.values(JobTitle);
  countries: Country[] = Object.values(Country);
  selectedJobTitle!: JobTitle;
  displayAddModal!: boolean;
  newContact: ContactDTO = new ContactDTO();

  members!: string[];

  photo: File | null = null;
  invalidType!: boolean;

  filteredContacts: Contact[] = [];
  searchTerm: string = '';
  searchOptions = [
    { label: 'Firstname', value: 'firstname' },
    { label: 'Lastname', value: 'lastname' },
  ];
  selectedSearchField: string = this.searchOptions[0].value;

  constructor(private adminService: AdminService, private messageService: MessageService,
              private authService: AuthService,) {
  }

  ngOnInit(): void {
    this.getContacts();
    this.selectedContact = new Contact();
    console.log(this.countries);
  }

  getContacts(){
    this.adminService.getContacts().subscribe(
      (data: Contact[]) => {this.contacts = data;
        this.filteredContacts = data;
        this.members = this.contacts.map(contact => contact.username);
        console.log(this.members);
      },
    )
  }

  addContact() {
    this.newContact = new ContactDTO();
    this.newContact.contactOwnerUsername = this.members.at(0);
    console.log(this.newContact);
    this.displayAddModal = true;
  }

  editContact(contact: Contact) {
    this.selectedContact = contact;
    this.selectedJobTitle = this.selectedContact.jobTitle;
    this.displayEditModal = true;
  }


  deleteContact(id: number) {
    this.adminService.deleteContact(id).pipe(
      finalize(() => {this.getContacts();
        this.showSuccess('User deleted successfully.');
      })
    ).subscribe(
      () => {console.log('User deleted successfully');
      }
      ,
      error => console.error('Error deleting user', error)
    );
  }

  saveContact() {
    this.adminService.editContact(this.selectedContact.id, this.selectedJobTitle).subscribe(
      data => {
        this.displayEditModal = false;
        console.log(data);
        this.getContacts();
        this.showSuccess('Job Title successfully updated');
      },
      error =>
        this.showError('Error')
    );
  }

  postContact(): void {
    this.adminService.createContact(this.newContact, this.photo).subscribe(
      response => {
        console.log('Contact created successfully', response);
        this.showSuccess('Contact created successfully');
        this.newContact = new ContactDTO();
        this.displayAddModal = false;
        this.getContacts();
      },
      error => {
        this.showError('Username or email provided are in use');
      }
    );
  }

  showSuccess(content: string) {
    this.messageService.add({severity: 'success', summary: 'Success', detail: content});
  }

  showError(content: string) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: content});
  }

  onFileSelect(event: any) {
    this.invalidType = false;
    if(event.files && event.files.length > 0) {
      // @ts-ignore
      const selectedFile: File = event.files[0];
      const fileType = selectedFile.type;
      const validTypes = ['image/jpeg', 'image/png'];

      if (!validTypes.includes(fileType)) {
        this.invalidType = true;
        this.photo = null;
      } else {
        this.photo = selectedFile;
        console.log('Selected file:', this.photo);
      }
    }
  }

  filterContacts() {
    this.filteredContacts = this.contacts.filter(contact => {
      const term = this.searchTerm.toLowerCase();
      switch (this.selectedSearchField) {
        case 'firstname':
          return contact.firstname.toLowerCase().includes(term);
        case 'lastname':
          return contact.lastname.toLowerCase().includes(term);
        default:
          return false;
      }
    });
  }

  isValidPassword(password: string) {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;
    if (!password)
      return false;
    return passwordRegex.test(password);
  }
}
