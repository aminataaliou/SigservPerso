
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {TUI_DEFAULT_MATCHER, TuiBooleanHandler, tuiPure} from '@taiga-ui/cdk';
import {TuiFileLike} from '@taiga-ui/kit';
import {Observable, of, Subject, timer} from 'rxjs';
import {finalize, map, switchMap} from 'rxjs/operators';
import { Utilisateur } from 'src/app/shareds/models/utilisateur';
import { UtilisateurService } from 'src/app/shareds/services/utilisateur.service';
import {Type} from "../../../shareds/models/type";
import {Profil} from "../../../shareds/models/profil";

@Component({
  selector: 'app-nouveau',
  templateUrl: './nouveau.component.html',
  styleUrls: ['./nouveau.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouveauComponent implements OnInit{


  utiForm = new FormGroup({
    nom: new FormControl(``, Validators.required),
    prenom: new FormControl(``, Validators.required),
    email: new FormControl(``, Validators.required),
    profil: new FormControl(``),
  });
  search: string | null = '';
  profils : string[] = Object.keys(Profil);

  ngOnInit(): void {
  }

  constructor(
    protected router: Router,
    private utilisateurService:UtilisateurService,
    ){}

    utiSubmited (){
      console.log(this.utiForm.value);
      const utilisateur: Utilisateur | undefined = this.createForm();
      this.utilisateurService.create(utilisateur!)
        .subscribe(
        (res) => {
          console.log("Savegarder avec succès");
          console.log(res);
          this.router.navigateByUrl("/admin/utilisateurs/liste").then();
        },
        (err)=>{
          console.log("Erreur lors de la sauvegarde");
        }
      )
    }

    createForm(): Utilisateur | undefined {
      const utilisateur = new Utilisateur();
       return {
         ...new Utilisateur(),
         nom: this.utiForm.get("nom")?.value,
         prenom: this.utiForm.get("prenom")?.value,
        email : this.utiForm.get("email")?.value,
        profil: this.utiForm.get("profil").value,
         createdAt:  null,
        updatedAt:  null
       }
      }
}
