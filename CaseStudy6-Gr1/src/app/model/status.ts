import { Account } from "./account";

export class Status{
  id: number;
  content: string;
  postDay: string
  status: string;
  account: Account;
  img: any;

  constructor(id: number, content: string, postDay: string, status: string, account: Account, img: any){
    this.id = id;
    this.content = content;
    this.postDay = postDay;
    this.status = status;
    this.account = account;
    this.img = img;
  }
}
