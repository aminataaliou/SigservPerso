import {Component, ChangeDetectionStrategy, OnInit, Inject} from '@angular/core';
import { AppbarService } from 'src/app/shareds/services/appbar.service';
import {TUI_IS_MOBILE} from "@taiga-ui/cdk";
import {TUI_ARROW} from "@taiga-ui/kit";
@Component({
  selector: 'app-sidnav',
  templateUrl: './sidnav.component.html',
  styleUrls: ['./sidnav.component.less'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SidnavComponent implements OnInit{
  open: boolean = true;
  open1 = false;

  readonly arrow = TUI_ARROW;

  constructor(
    private appbarService : AppbarService,
    @Inject(TUI_IS_MOBILE) readonly isMobile: boolean
  ){}

  ngOnInit(): void {
    this.appbarService.openSidenav.subscribe((openside: boolean)=>{
      this.open = openside;
    });

  }
  get Open(){
    return this.open;
  }

  toggle(): void{
    this.appbarService.toggle();
  }


  onClick(event: MouseEvent): void {
    console.info('click', event);
  }
 }

