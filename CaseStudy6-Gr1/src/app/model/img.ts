export class img {
  id: number;
  name !: string;
  status!: number

  constructor(id: number,img: string, status: number)
{
  this.id = id;
  this.name = img;
  this.status = status;
}

}
