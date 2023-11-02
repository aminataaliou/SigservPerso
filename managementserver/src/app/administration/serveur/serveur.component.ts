import {Component, OnInit} from '@angular/core';
import {ServeurService} from "../../shareds/services/serveur.service";
@Component({
  selector: 'app-serveur',
  templateUrl: './serveur.component.html',
  styleUrls: ['./serveur.component.less']
})
export class ServeurComponent implements OnInit{

  constructor(private serveurService:ServeurService) {

  }
  ngOnInit(): void {
    this.query();
  }

  query(): void {
    this.serveurService.query()
    .subscribe(
      (res) => {
        console.log(res);
      },
      (err)=>{

      }
      )
  }

}
