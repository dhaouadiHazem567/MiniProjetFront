import {TypeActivity} from "../enums/TypeActivity";
import {Contact} from "./Contact";

export class Activity {

  id!: number;
  date!: Date;
  typeActivity!: TypeActivity;
  subject!: string;
  notes!: string;
  contacts!: Contact[];

}
