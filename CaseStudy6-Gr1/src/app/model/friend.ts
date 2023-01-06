export class Friend{

  id !: number;
  fistName !: string;
  lastName !: string;
  birthDay !: Date;
  img !: string;
  gender !: string;
  address !: string;
  phoneNumber !: string;

  constructor(id: number, fistName: string, lastName: string, birthDay: Date, img: string, gender: string, address: string, phoneNumber: string) {
    this.id = id;
    this.fistName = fistName;
    this.lastName = lastName;
    this.birthDay = birthDay;
    this.img = img;
    this.gender = gender;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }
}
