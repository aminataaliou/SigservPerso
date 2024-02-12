import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Utilisateur } from 'src/app/shareds/models/utilisateur';
import { UtilisateurService } from 'src/app/shareds/services/utilisateur.service';
import {FormBuilder} from "@angular/forms";
import {Profil} from "../../../shareds/models/profil";

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
    username:[],
    password:[],
    createdAt: [],
    updatedAt: [],
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
        }}
    )}

  updateForm(utilisateur: Utilisateur){
    console.log("Before Update")
    console.log(utilisateur)
    this.utiForm.patchValue({
      id:utilisateur.id,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      email: utilisateur.email,
      profil: utilisateur.profil,
      username: utilisateur.username,
      password: utilisateur.password,
      createdAt: utilisateur.createdAt,
      updatedAt: utilisateur.updatedAt
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

  createForm(): Utilisateur | undefined {
    return {
      ...new Utilisateur(),
      id: this.utiForm.get("id")?.value,
      nom: this.utiForm.get("nom")?.value,
      prenom: this.utiForm.get("prenom")?.value,
      email : this.utiForm.get("email")?.value,
      profil: this.utiForm.get("profil").value,
      createdAt:  this.utiForm.get("createdAt").value,
      updatedAt:  this.utiForm.get("updatedAt").value,
      username:  this.utiForm.get("username").value,
      password:  this.utiForm.get("password").value,
    }
  }

  utiSubmited(){
    console.log("UTILISATEURRRRRS",this.utiForm)
    const utilisateur :Utilisateur=this.createForm();
    this.utilisateurService.update(utilisateur)
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
