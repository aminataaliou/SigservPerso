import { Component, OnInit ,ChangeDetectionStrategy } from '@angular/core';
import { AppbarService } from '../shareds/services/appbar.service';
import { TuiSizeL, TuiSizeS } from '@taiga-ui/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.less']
})
export class AdministrationComponent implements OnInit {

  open= false;

  dropdownOpen = false;
  size: TuiSizeL | TuiSizeS = 's';

  constructor(
    private appbarService: AppbarService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.appbarService.openSidenav.subscribe(openside=>{
      this.open = openside;
    });
  }



  onDropdownOpen():void {
    this.dropdownOpen = !this.dropdownOpen;
    setTimeout(()=>{
      localStorage.removeItem("authenticationToken");
      this.router.navigateByUrl("/").then();
    },600);
  }


  toggle(open:boolean ): void{
    this.appbarService.toggle()
  }


}
