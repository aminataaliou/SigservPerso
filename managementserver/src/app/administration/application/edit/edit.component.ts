import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Application } from 'src/app/shareds/models/application';
import { ApplicationService } from 'src/app/shareds/services/application.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Type} from "../../../shareds/models/type";
import {Etat} from "../../../shareds/models/etat";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {

  id:number|undefined;
  application:Application|undefined;
  types : string[] = Object.keys(Type);
  etats : string[] = Object.keys(Etat);

  appliForm = this.fb.group({
    id:[],
    nom: [],
    adresseip:[],
    url: [],
    type: [],
    port: [],
    etat: [],
    dateDeploiement: [],
    serveurs: [],
    tags: [],
  });

  constructor(
    private applicataionService: ApplicationService,
    private activatedroute:ActivatedRoute,
    protected fb: FormBuilder,
    private router:Router
  ){}

  ngOnInit(): void {
    this.activatedroute.params.subscribe((params) =>{
      if(params['id']){
        this.findApplicationById(Number.parseInt(params['id']))}
    })
   console.log("data======",this.id);
  }

  updateForm(application:Application){
    console.log("Before Update")
    console.log(application)

    this.appliForm.patchValue({
      id:application.id,
      nom: application.nom,
      adresseip: application.adresseIp,
      port: application.port,
      etat: application.etat,
      type: application.type,
      dateDeploiement: application.createdAt,
      url: application.url,
      tags: application.tags,
      serveurs: application.serveurs,
    })

    console.log("After Update")
    console.log(this.appliForm.value)
  }

  findApplicationById(id:number){
    this.applicataionService.findById(id).subscribe(
      (res) => {
      console.log("APPLICATIONS",res);
      this.application = res.body ?? undefined;
        if (this.application) this.updateForm(this.application);
      console.log(this.application)

    },
    (err)=>{}
    )
    this.updateForm(this.application!)
  }

  appliSubmited(){
    console.log("Application",this.appliForm)
    this.applicataionService.update(this.application).subscribe(
      (res) => {
        console.log("mise à jour effectué avec succès",res);
        this.router.navigateByUrl("/admin/applications/liste").then();
      },
      (err)=>{
        console.log("Erreur lors de la mise à jour",err);
      }
    )
  }
}
