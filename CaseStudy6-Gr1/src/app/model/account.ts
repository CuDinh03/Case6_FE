export class Account {
  id: number;
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  birthday: Date;
  gender: string;

  constructor(id: number, username: string, password: string, email: string, firstname: string, lastname: string, phone: string, address: string, birthday: Date, gender: string)

{
  this.id = id;
  this.username = username;
  this.password = password;
  this.email = email;
  this.firstname = firstname;
  this.lastname = lastname;
  this.phone = phone;
  this.address = address;
  this.birthday = birthday;
  this.gender = gender;
}
}
