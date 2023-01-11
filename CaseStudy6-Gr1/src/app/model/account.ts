import { img } from "./img";


export class Account {
  id: number;
  userName: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  birthday: Date;
  gender: string;
  img : img;

  constructor(id: number, userName: string, password: string, email: string, firstname: string, lastname: string,
              phone: string, address: string, birthday: Date, gender: string, img : img)
{
  this.id = id;
  this.userName = userName;
  this.password = password;
  this.email = email;
  this.firstname = firstname;
  this.lastname = lastname;
  this.phone = phone;
  this.address = address;
  this.birthday = birthday;
  this.gender = gender;
  this.img = img;
}
}
