import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";
import {Status} from "../../model/status";
import {StatusService} from "../../service/status.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.css']
})
export class PageMainComponent implements OnInit {
  statuses: Status[] = [];
  status1: any;
  statusE!: Status;
  userName = localStorage.getItem('userName');

  constructor(private router: Router, private statusService: StatusService) {
  }

  view(): void {
    this.statusService.getAll().subscribe((data) => {
      this.statuses = data[0];
      console.log(this.statuses);
    })
  }

  ngOnInit(): void {
    this.view()
  }

  createForm = new FormGroup({
    content: new FormControl(""),
    status: new FormControl(""),
  })

  create() {
    this.status1 ={
      content: this.createForm.value.content,
      status: this.createForm.value.status,
      account: {
        id: localStorage.getItem("id")
      }
    }
    this.statusService.saveStatus(this.status1).subscribe((data) => {
      this.createForm.reset();
      this.router.navigate(["/main"]);
    })

  }

  showEdit(index: number) {
    console.log(index);
    this.statusService.findById(index).subscribe((result) => {
      console.log(result);
      this.createForm.patchValue({
        content: result.content,
        status: result.status,
      })
    })
  }

  edit(index: number) {
    // @ts-ignore
    const status2: Status = {content: this.createForm.value.content, status: this.createForm.value.status}
    console.log(status2);
    this.statusService.editStatus(index, status2).subscribe(() => {
      this.view();
      this.createForm.reset();
      this.router.navigate(["/main"]);
    })
  }

  deleteEdit(index: number) {
    this.statusService.deleteStatus(index).subscribe(() => {
      this.view();
      this.router.navigate(['/main'])})
  }

  mainView(){
    this.router.navigate(['/main'])
  }

  profileView(){
    this.router.navigate(['/profile'])
  }

  modalView(){
    this.router.navigate(['/modal'])
  }

  showComment(){
    let cmt = document.getElementById('o-hide')

  }

}
