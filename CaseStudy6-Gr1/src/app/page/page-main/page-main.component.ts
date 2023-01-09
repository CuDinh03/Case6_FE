import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";
import {StatusService} from 'src/app/service/status.service';
import {FormGroup} from "@angular/forms";
import {Status} from "../../model/status";

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.css']
})
export class PageMainComponent implements OnInit, OnChanges {
  statuses: Status[] = [];

  constructor(private router: Router, private statusService: StatusService) {
  }

  ngOnInit(): void {
    this.statusService.getAll().subscribe((data) => {
      this.statuses = data;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.statusService.getAll().subscribe((data) => {
      this.statuses = data;
    })
  }

  createForm = new FormGroup({})

  mainView() {
    this.router.navigate(['/main'])
  }

  profileView() {
    this.router.navigate(['/profile'])
  }

  modalView() {
    this.router.navigate(['/modal'])
  }

  showComment(){
    let cmt = document.getElementById('o-hide')

  }

}
