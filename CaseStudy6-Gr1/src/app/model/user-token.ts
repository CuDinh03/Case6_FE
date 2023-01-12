import {Role} from "./role";
import {Img} from "./img";

export interface UserToken {
  id: number;
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
  birthday: Date;
  fistName: string;
  lastName: string;
  address: string;
  gender: string;
  img: [Img];
  roles: [Role];
  token: string;
}

