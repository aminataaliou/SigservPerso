import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ComptedaccesService} from "../../../shareds/services/comptedacces.service";
import {Comptedacces} from "../../../shareds/models/comptedacces";
import {Serveur} from "../../../shareds/models/serveur";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit{

  id:number|undefined;
  comptedacces:Comptedacces|undefined;

  compteForm = this.fb.group({
    nom: [],
    password: [],
    confirmationPassword:[],
    id:[],
    serveurs:[],
    createdAt:[],
  })

  constructor(
    private activatedroute:ActivatedRoute,
    protected fb: FormBuilder,
    private router:Router,
    private comptedaccesService:ComptedaccesService,
  ) {}

  ngOnInit(): void {
    this.activatedroute.params.subscribe((params) =>{
      if(params['id']){
        this.findComptedaccesById(Number.parseInt(params['id']))}
    })
    console.log("data======",this.id);
  }

  updateForm(comptedacces:Comptedacces){
    console.log("Before Update")
    console.log(this.comptedacces)
    this.compteForm.patchValue({
      id:comptedacces.id,
      nom:comptedacces.nom,
      password: comptedacces.password,
      serveurs: comptedacces.serveurs,
      confirmationPassword: comptedacces.password,
      createdAt : comptedacces.createdAt,
    })
    console.log("After Update")
    console.log(this.compteForm.value)
  }

  findComptedaccesById(id:number){
    this.comptedaccesService.findById(id).subscribe(
      (res) => {
        console.log("COMPTE",res);
        this.comptedacces = res.body ?? undefined;
        if (this.comptedacces) this.updateForm(this.comptedacces);
        console.log(this.comptedacces)
      },
      (err)=>{}
    )

  }

  createForm():Comptedacces | undefined {
    return {
      ...new Comptedacces(),
      nom: this.compteForm.get("nom")?.value,
      password: this.compteForm.get("password")?.value,
      createdAt: this.compteForm.get("createdAt")?.value,
      serveurs:this.compteForm.get("serveurs")?.value,
      id:this.compteForm.get("id")?.value,
      updatedAt:  this.compteForm.get("updatedAt")?.value
    };
  }

  compteSubmited(){
    console.log("COMPTE",this.compteForm)
    const comptedacces: Comptedacces | undefined = this.createForm();
    this.comptedaccesService.update(comptedacces).subscribe(
      (res) => {
        console.log("mise à jour effectué avec succès",res);
        this.router.navigateByUrl("/admin/compte-acces/liste").then();
      },
      (err)=>{
        console.log("Erreur lors de la mise à jour",err);
      }
    )
  }
}
