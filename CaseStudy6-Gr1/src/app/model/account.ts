import {Img} from "./img";
import {Role} from "./role";


export class Account {
  id: number;
  userName: string;
  password: string;
  status: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  birthDay: Date;
  gender: string;
  img: Img;
  roles!: Role;

  constructor(id: number, userName: string, status: number, password: string, email: string, firstName: string, lastName: string,
              phoneNumber: string, address: string, birthDay: Date, gender: string, img: Img, roles: Role) {
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.birthDay = birthDay;
    this.gender = gender;
    this.img = img;
    this.status = status;
    this.roles = roles;
  }
}
