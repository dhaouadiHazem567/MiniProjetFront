import {Role} from './Role';

export class User {

  id!: number;
  firstname!: string;
  lastname!: string;
  email!: string;
  username!: string;
  password!: string;
  photoPath!: string;
  roles!: Role[];
  code!: number;

}
