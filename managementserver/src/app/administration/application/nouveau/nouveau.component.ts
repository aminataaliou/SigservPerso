
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Application } from 'src/app/shareds/models/application';
import { Serveur } from 'src/app/shareds/models/serveur';
import { Tags } from 'src/app/shareds/models/tags';
import { Type } from 'src/app/shareds/models/type';
import { ApplicationService } from 'src/app/shareds/services/application.service';
import { ServeurService } from 'src/app/shareds/services/serveur.service';
import { TagsService } from 'src/app/shareds/services/tags.service';
import {Etat} from "../../../shareds/models/etat";
import {TuiDay} from "@taiga-ui/cdk";



@Component({
  selector: 'app-nouveau',
  templateUrl: './nouveau.component.html',
  styleUrls: ['./nouveau.component.less'],
})
export class NouveauComponent implements OnInit{


  appliForm = new FormGroup({
    nom: new FormControl(``, Validators.required),
    adresseip: new FormControl(``, Validators.required),
    url: new FormControl(``, Validators.required),
    type: new FormControl(``, Validators.required),
    port: new FormControl(``, Validators.required),
    etat: new FormControl(``, Validators.required),
    dateDeploiement: new FormControl(new TuiDay(2017, 2, 15)),

  });
  types : string[] = Object.keys(Type);
  etats : string[] = Object.keys(Etat);
  serveurs : Serveur[] = [];
  tags: Tags[]=[];

  constructor(
    protected router: Router,
    private applicationServive : ApplicationService,
    protected serveurService : ServeurService,
    protected tagsservice : TagsService

  ) {}


  ngOnInit(): void {
    this.findAllServeurs();
    this.findAllTags()
  }

  findAllServeurs(): void {
    this.serveurService.query()
      .subscribe(
        (res) => {
          console.log("SERVEURS");
          this.serveurs = res.body ?? [];
        },
        (err)=>{

        }
      )
  }

  findAllTags(): void {
    this.tagsservice.query()
      .subscribe(
        (res) => {
          console.log("TAGS");
          this.tags = res.body ?? [];
        },
        (err)=>{

        }
      )
  }

 appliSubmited (){
  console.log(this.appliForm.value);
  const application: Application | undefined = this.createForm();
  this.applicationServive.create(application!)
    .subscribe(
    (res) => {
      console.log("Savegarder avec succès");
      console.log(res);
      this.router.navigateByUrl("/admin/applications/liste").then();
    },
    (err)=>{
      console.log("Erreur lors de la sauvegarde");
    }
  )
  }

  createForm(): Application | undefined {
    const serveur = new Application();
     return {
       ...new Application(),
       id: this.appliForm.get("id")?.value,
       nom: this.appliForm.get("nom")?.value,
       port:this.appliForm.get("port")?.value,
       url: this.appliForm.get("url")?.value,
       adresseIp:this.appliForm.get("adresseip")?.value,
       type: this.appliForm.get("type")?.value,
       etat: this.appliForm.get("etat")?.value,
       createdAt:  null,
       updatedAt: null,
       tags:this.appliForm.get("tags")?.value,
       serveurs:this.appliForm.get("serveurs")?.value,

     };
}
}
