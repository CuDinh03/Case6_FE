// import {Role} from "./role";
// import {Img} from "./img";
//
// export interface AccountToken {
//   id: number;
//   userName: string;
//   password: string;
//   email: string;
//   phoneNumber: string;
//   birthday: string;
//   fistName: string;
//   lastName: string;
//   address: string;
//   gender: string;
//   img: [Img];
//   role: [Role];
//   accessToken: string;
// }
import {Role} from "./role";

export interface UserToken {
  id: number;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
  birthday: string;
  fullname: string;
  address: string;
  roles: [Role];
  accessToken: string;
}
