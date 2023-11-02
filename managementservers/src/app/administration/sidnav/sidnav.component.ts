import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppbarService } from 'src/app/shareds/services/appbar.service';


@Component({
  selector: 'app-sidnav',
  templateUrl: './sidnav.component.html',
  styleUrls: ['./sidnav.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SidnavComponent implements OnInit {
 
  open: boolean = true;

  constructor(
    private appbarService : AppbarService
  ){}

  ngOnInit(): void {
    this.appbarService.openSidenav.subscribe(openside=>{
      this.open = openside;
      console.log("SIDNAV ", this.open);
    });
    
  }
  get isOpen(){
    return this.open;
  }

  toggle(): void{
    this.appbarService.toggle();
  }


  onClick(event: MouseEvent): void {
    console.info('click', event);
  }

}
