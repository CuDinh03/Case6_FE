export class comment{
  id!: number;
  text !: string;
  status !: number;


  constructor(id: number, text: string, status: number) {
    this.id = id;
    this.text = text;
    this.status = status;
  }
}
