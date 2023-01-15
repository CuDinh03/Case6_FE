
export class Acc {
  id !: number;
  firstName !: string;
  lastName !: string;
  birthDay !: Date;
  gender !: string;
  address !: string;
  phoneNumber !: string;
  status !: number


  constructor(id: number, firstName: string, lastName: string, birthDay: Date, gender: string, address: string, phoneNumber: string, status: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDay = birthDay;
    this.gender = gender;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.status = status;
  }
}
