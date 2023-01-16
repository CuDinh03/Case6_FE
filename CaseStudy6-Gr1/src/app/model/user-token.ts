import {Role} from "./role";
import {img} from "./img";

export class UserToken {
  id !: number;
  userName !: string;
  password!: string;
  email!: string;
  phoneNumber!: string;
  birthday!: Date;
  fistName!: string;
  lastName!: string;
  address!: string;
  gender!: string;
  img!: [img];
  roles!: [Role];
  token!: string;
}

