
export class Status {
id: number;
content: String;
date: Date;
status: any;

  constructor(id: number, content: String, date: Date, status: any) {
    this.id = id;
    this.content = content;
    this.date = date;
    this.status = status;
  }
}
