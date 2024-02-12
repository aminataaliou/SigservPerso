import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Emplacement } from 'src/app/shareds/models/emplacement';
import { Etat } from 'src/app/shareds/models/etat';
import { Serveur} from 'src/app/shareds/models/serveur';
import { Systeme } from 'src/app/shareds/models/systeme';
import { Type } from 'src/app/shareds/models/type';
import { Utilisateur } from 'src/app/shareds/models/utilisateur';
import { EmplacementService } from 'src/app/shareds/services/emplacement.service';
import { ServeurService } from 'src/app/shareds/services/serveur.service';
import { SystemeService } from 'src/app/shareds/services/systeme.service';
import {Application} from "../../../shareds/models/application";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit  {

  serveurForm = this.fb.group({
    id: [],
    nom: [],
    emplacement: [],
    systeme: [],
    tags: [],
    type: [],
    etat: [],
    serveurs: [],
    comptedacces: [],
    applications: [],
    adresseip: [],
    createdAt: [],
    updatedAt: [],
  });

  search: string | null = '';
  searchEmplacement = new FormControl("");
  types : string[] = Object.keys(Type);
  etats : string[] = Object.keys(Etat);
  emplacements: Emplacement[] = [];
  systemes: Systeme[] = [];
  utilisateurs: Utilisateur[] = [];
  applications: Application[] = [];

  readonly stringifyEmplacement = (emplacement: Emplacement): string => `Nom: ${emplacement.datacenter.nom} | Armoire: ${emplacement.armoire} | Couloir: ${emplacement.couloir} | Etagère: ${emplacement.etagere}`;
  readonly stringifySysteme = (systeme: Systeme): string => `Nom: ${systeme.nom} | Version: ${systeme.version} | Distribution: ${systeme.distribution}`;

  serveur: Serveur  | undefined;
  constructor(
    private activatedroute: ActivatedRoute,
    private serveurService: ServeurService,
    protected emplacementService: EmplacementService,
    protected systemeService: SystemeService,
    protected fb: FormBuilder,
    private router:Router
  ){}

  ngOnInit(): void {
    this.activatedroute.params.subscribe((params) =>{
      if(params['id']){
        this.findServeurById(Number.parseInt(params['id']))}
    })
    this.findAllEmplacements();
    this.findAllSystemes();
  }


  findAllSystemes(): void {
    this.systemeService.query()
      .subscribe(
        (res) => {
          console.log("SYSTEMES");
          this.systemes = res.body ?? [];
        },
        (err)=>{

        }
      )
  }

  findAllEmplacements(): void {
    this.emplacementService.query()
      .subscribe(
        (res) => {
          console.log("EMPLACEMENT");
          this.emplacements = res.body ?? [];
        },
        (err)=>{

        }
      )
  }

 updateForm(serveur: Serveur){

    console.log("Before Update")
    console.log(serveur)

   this.serveurForm.patchValue({
     id: serveur.id,
     nom: serveur.nom,
     adresseip: serveur.adresseip,
     etat: serveur.etat,
     emplacement: serveur.emplacement,
     comptedacces: serveur.comptedacces,
     systeme: serveur.systeme,
     type: serveur.type,
     serveurs: serveur.serveurs,
     applications: serveur.applications,
     updatedAt: serveur.updatedAt,
     createdAt: serveur.createdAt,
     tags: serveur.tags
   })
   console.log("After Update")
   console.log(this.serveurForm.value)
  }

  findServeurById(id:number){
    if(id){
      this.serveurService.findById(id).subscribe(
        (res) => {
          this.serveur = res.body ?? undefined
          if (this.serveur) this.updateForm(this.serveur);
        },
        (err)=>{ }
      )
      this.updateForm(this.serveur!)
    }
  }

  createForm(): Serveur | undefined {
    return {
      ...new Serveur(),
      nom: this.serveurForm.get("nom")?.value,
      type: this.serveurForm.get("type")?.value,
      adresseip: this.serveurForm.get("adresseip")?.value,
      etat: this.serveurForm.get("etat")?.value,
      createdAt: this.serveurForm.get("createdAt")?.value,
      emplacement: this.serveurForm.get("emplacement")?.value,
      id: this.serveurForm.get("id")?.value,
      systeme: this.serveurForm.get("systeme")?.value,
      comptedacces: this.serveurForm.get("comptedacces")?.value,
      applications: this.serveurForm.get("applications")?.value,
      tags: this.serveurForm.get("tags")?.value,
      serveurs: this.serveurForm.get("serveurs")?.value,
      updatedAt: this.serveurForm.get("updatedAt")?.value
    };
  }
  servSubmited(){
    console.log("AAAAAAAAAAAAAAAAAAA")
    const serveur: Serveur | undefined = this.createForm();
    this.serveurService.update(serveur!)
      .subscribe(
        (res) => {
          console.log("mise à jour effectué avec succès",res);
          this.router.navigateByUrl("/admin/serveurs/liste").then();
        },
        (err)=>{
          console.log("Erreur lors de la mise à jour",err);
        }
      )
  }


}
