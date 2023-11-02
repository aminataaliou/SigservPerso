import {Component, OnInit} from '@angular/core';
import {Utilisateur} from "../../../shareds/models/utilisateur";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilisateurService} from "../../../shareds/services/utilisateur.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit{
  id:number | undefined;
  utilisateur:Utilisateur | undefined;

  constructor(
    private activatedroute: ActivatedRoute,
    protected router: Router,
    private utilisateurService:UtilisateurService
  ) {}
  ngOnInit(): void {
    this.activatedroute.params.subscribe((params) =>{
      if(params['id']){
        this.id=params['id'];
        this.findUtilisateurById(this.id!);
      }
    })
    console.log("data======",this.id);
  }

  findUtilisateurById(id:number){
    this.utilisateurService.findById(id).subscribe(
      (res) => {
        console.log("UTILISATEURS",res);
        this.utilisateur = res.body ?? undefined;
        console.log(this.utilisateur)
      },
      (err)=>{}
    )
  }

}
