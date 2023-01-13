
export class Friend{

  id !: number;
  firstName !: string;
  lastName !: string;
  birthDay !: Date;
  img !: string;
  gender !: string;
  address !: string;
  phoneNumber !: string;
  status !: number

  constructor(id: number, firstName: string, lastName: string, birthDay: Date, img: string, gender: string, address: string, phoneNumber: string,status:number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDay = birthDay;
    this.img = img;
    this.gender = gender;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.status= status;
  }
}
