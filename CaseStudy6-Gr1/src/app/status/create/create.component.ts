import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {StatusService} from "../../service/status.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{
  constructor(private statusService: StatusService, private router: Router) {
  }

  ngOnInit(): void {
  }

  createForm = new FormGroup({
    id: new FormControl,
    content: new FormControl(""),
    postDay: new FormControl(""),
    Status: new FormControl(""),
  })

  create() {
    this.statusService.saveStatus(this.createForm.value).subscribe()
    this.createForm.reset()
    this.router.navigate(["/"]);
  }


}
