import {JobTitle} from "../enums/JobTitle";
import {Address} from "./Address";

export class ContactDTO {

  firstname!: string;
  lastname!: string;
  email!: string;
  username!: string;
  password!: string;
  phone!: number | undefined;
  jobTitle!: JobTitle | undefined;
  company!: string;
  address!: Address;
  contactOwnerUsername!: string | undefined;

  constructor() {
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.username = '';
    this.password = '';
    this.phone = undefined;
    this.jobTitle = undefined;
    this.company = '';
    this.address = new Address();
    this.contactOwnerUsername = '';

  }

}
