import { Component, OnInit ,ChangeDetectionStrategy } from '@angular/core';
import { AppbarService } from '../shareds/services/appbar.service';
import { TuiSizeL, TuiSizeS } from '@taiga-ui/core';

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
    private appbarService: AppbarService
  ){}

  ngOnInit(): void {
    this.appbarService.openSidenav.subscribe(openside=>{
      this.open = openside;
    });
  }



  onDropdownOpen():void {
    this.dropdownOpen = !this.dropdownOpen;
  }


  toggle(open:boolean ): void{
    this.appbarService.toggle()
  }


}
