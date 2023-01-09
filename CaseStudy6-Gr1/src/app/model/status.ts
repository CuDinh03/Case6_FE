import { Account } from "./account";

export class Status{
  id: number;
  content: string;
  postDay: string
  status: string;
  owner: Account;

  constructor(id: number, content: string, postDay: string, status: string, owner: Account){
    this.id = id;
    this.content = content;
    this.postDay = postDay;
    this.status = status;
    this.owner = owner;
  }
}
