import { Component, OnInit } from '@angular/core';
import { AppbarService } from '../shareds/services/appbar.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  constructor(
    private appbarService: AppbarService
  ){}

  ngOnInit(): void {
   
  }

  toggle(): void{
    this.appbarService.toggle();
  }


}
