import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.css']
})
export class PageMainComponent {
  constructor(private router: Router) {
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

}
