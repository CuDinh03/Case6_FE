import {Role} from "./role";
import {Img} from "./img";

export interface Account {
  id: number;
  status : number;
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
  birthday: string;
  fistName: string;
  lastName: string;
  address: string;
  gender: string;
  img: [Img];
  role: [Role];

}
