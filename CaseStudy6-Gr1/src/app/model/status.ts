import { Account } from "./account";

export class Status{
  id: number;
  content: string;
  postDay: string
  status: string;
  account: Account;
  comment: any;
  likes: any
  img: any;

  constructor(id: number, content: string, postDay: string, status: string, account: Account,comment: any, likes: any, img: any){
    this.id = id;
    this.content = content;
    this.postDay = postDay;
    this.status = status;
    this.account = account;
    this.comment = comment;
    this.likes = likes;
    this.img = img;
  }
}
