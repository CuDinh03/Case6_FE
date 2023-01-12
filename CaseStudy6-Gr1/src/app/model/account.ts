import { Img } from "./img";


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
  img : Img;

  constructor(id: number, userName: string, password: string, email: string, firstname: string, lastname: string,
              phone: string, address: string, birthday: Date, gender: string, img : Img)
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
