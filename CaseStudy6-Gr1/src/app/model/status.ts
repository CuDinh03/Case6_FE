import { Account } from "./account";

export interface Status{
  id: number;
  content: string;
  postDay: string
  status: string;
  owner: Account;
}
