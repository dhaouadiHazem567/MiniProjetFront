import {User} from "./User";
import {JobTitle} from "../enums/JobTitle";
import {Address} from "./Address";

export class Contact extends User{

  phone!: number;
  jobTitle!: JobTitle;
  company!: string;
  address!: Address;
  contactOwnerUsername!: string;

}
