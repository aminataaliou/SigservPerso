import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ComptedaccesService} from "../../../shareds/services/comptedacces.service";
import {Comptedacces} from "../../../shareds/models/comptedacces";
import {Serveur} from "../../../shareds/models/serveur";

@Component({
  selector: 'app-nouveau',
  templateUrl: './nouveau.component.html',
  styleUrls: ['./nouveau.component.less']
})
export class NouveauComponent implements OnInit{

  compteForm = new FormGroup({
    nom: new FormControl(``, Validators.required),
    password: new FormControl(``, Validators.required),
    confirmationPassword: new FormControl(``, Validators.required),
  })

  constructor(
    protected router: Router,
    private comptedaccesService:ComptedaccesService,
  ) {}

  ngOnInit(): void {
  }

  compteSubmited (): void{
    console.log("FORMVALUE=========",this.compteForm.value);
    const comptedacces: Comptedacces | undefined = this.createForm();
    this.comptedaccesService.create(comptedacces!)
      .subscribe(
        (res) => {
          console.log("Savegarder avec succès",res);
          this.router.navigateByUrl("/admin/compte-acces/liste").then();
        },
        (err)=>{
          console.log("Erreur lors de la sauvegarde",err);
        }
      )
  }

  createForm():Comptedacces | undefined {
    const comptedacces = new Comptedacces();
    return {
      ...new Comptedacces(),
      nom: this.compteForm.get("nom")?.value,
      password: this.compteForm.get("password")?.value,
      createdAt: null,
      serveurs:null,
      id:null,
      updatedAt:  null
    };
  }
}
