import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";
import {Status} from "../../model/status";
import {StatusService} from "../../service/status.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.css']
})
export class PageMainComponent implements OnInit {
  statuses: Status[] = [];

  constructor(private router: Router, private statusService: StatusService) {
  }

  ngOnInit(): void {
    this.statusService.getAll().subscribe((data) => {
      this.statuses = data[0];
      console.log(this.statuses);
    })
  }

  createForm = new FormGroup({

  })

  mainView(){
    this.router.navigate(['/main'])
  }
  profileView(){
    this.router.navigate(['/profile'])
  }

  modalView(){
    this.router.navigate(['/modal'])
  }

}
