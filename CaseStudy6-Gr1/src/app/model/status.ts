import { Account } from "./account";

export class Status{
  id: number;
  content: string;
  postDay: string
  status: string;
  account: Account;
  comment: any;
  img: any;

  constructor(id: number, content: string, postDay: string, status: string, account: Account,comment: any, img: any){
    this.id = id;
    this.content = content;
    this.postDay = postDay;
    this.status = status;
    this.account = account;
    this.comment = comment;
    this.img = img;
  }
}
