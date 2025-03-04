import {TypeActivity} from "../enums/TypeActivity";

export class ActivityDTO {

  date!: Date;
  typeActivity!: TypeActivity;
  subject!: string;
  notes!: string;
  contacts!: string[];

  constructor() {
    const [day, month, year] = new Date().toString().split('/');
    const formattedDateString = `${year}-${month}-${day}`;

    this.date = new Date(formattedDateString);
    this.typeActivity = TypeActivity.CALL;
    this.subject = '';
    this.notes = '';
    this.contacts = [];
  }
}
