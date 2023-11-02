import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Utilisateur } from 'src/app/shareds/models/utilisateur';
import { UtilisateurService } from 'src/app/shareds/services/utilisateur.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Profil} from "../../../shareds/models/profil";
import {Serveur} from "../../../shareds/models/serveur";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {

  id:number|undefined;
  utilisateur:Utilisateur|undefined;
  profils : string[] = Object.keys(Profil);

  utiForm = this.fb.group({
    nom: [],
    prenom: [],
    email: [],
    profil:[],
    id:[],
  });

  constructor(
    private activateRoute: ActivatedRoute,
    private utilisateurService:UtilisateurService,
    protected fb: FormBuilder,
    private router:Router
  ){}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      (Params) => {
        if(Params['id']){
          this.findUtilisateurById(Number.parseInt((Params['id'])))
        }
      }
    )
  }

  updateForm(utilisateur: Utilisateur){

    console.log("Before Update")
    console.log(utilisateur)


    this.utiForm.patchValue({
      id:utilisateur.id,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      email: utilisateur.email,
      profil: utilisateur.profil,

    })

    console.log("After Update")
    console.log(this.utiForm.value)
  }


  findUtilisateurById(id:number) {
    this.utilisateurService.findById(id).subscribe(
      (res) =>{
        console.log("UTILISATEURS",res);
        this.utilisateur= res.body?? undefined;
        if (this.utilisateur) this.updateForm(this.utilisateur);
      },
      (err)=>{ }
    )
    this.updateForm(this.utilisateur!)
  }

  utiSubmited(){
    console.log("UTILISATEURRRRRS",this.utiForm)
    this.utilisateurService.update(this.utilisateur)
      .subscribe(
        (res) => {
          console.log("mise à jour effectué avec succès",res);
          this.router.navigateByUrl("/admin/utilisateurs/liste").then();
        },
        (err)=>{
          console.log("Erreur lors de la mise à jour",err);
        }
      )
  }

}
