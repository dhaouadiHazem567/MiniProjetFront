import {Country} from "../enums/Country";

export class Address {

  address!: string;
  city!: string;
  country!: Country | undefined;
  state!: string;
  zipCode!: number | undefined;

  constructor() {
      this.address =  "";
      this.city = "";
      this.country = undefined;
      this.state = "";
      this.zipCode = undefined;
  }


}
