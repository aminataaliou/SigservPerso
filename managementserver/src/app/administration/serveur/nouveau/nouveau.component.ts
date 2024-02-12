import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Type} from "../../../shareds/models/type";
import {EmplacementService} from "../../../shareds/services/emplacement.service";
import {UtilisateurService} from "../../../shareds/services/utilisateur.service";
import {SystemeService} from "../../../shareds/services/systeme.service";
import {Systeme} from "../../../shareds/models/systeme";
import {Emplacement} from "../../../shareds/models/emplacement";
import {Utilisateur} from "../../../shareds/models/utilisateur";
import {Serveur} from "../../../shareds/models/serveur";
import {ServeurService} from "../../../shareds/services/serveur.service";
import {Router} from "@angular/router";
import {Etat} from "../../../shareds/models/etat";
import {ApplicationService} from "../../../shareds/services/application.service";
import {Application} from "../../../shareds/models/application";
import {Comptedacces} from "../../../shareds/models/comptedacces";
import {ComptedaccesService} from "../../../shareds/services/comptedacces.service";

@Component({
  selector: 'app-nouveau',
  templateUrl: './nouveau.component.html',
  styleUrls: ['./nouveau.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouveauComponent implements OnInit{

  searchEmplacement = new FormControl("");
  readonly testValue = new FormControl([]);
  servForm = new FormGroup({
    nom: new FormControl(``, Validators.required),
    type: new FormControl(``, Validators.required),
    etat: new FormControl(``, Validators.required),
    adresseip: new FormControl(``, Validators.required),
    emplacement: new FormControl(null, Validators.required ),
    systeme: new FormControl(null, Validators.required),
  });

    types : string[] = Object.keys(Type);
    etats : string[] = Object.keys(Etat);
    emplacements: Emplacement[] = [];
    systemes: Systeme[] = [];


    search: string | null = '';

  readonly stringifyEmplacement = (emplacement: Emplacement): string => `Nom: ${emplacement.datacenter.nom} |Armoire: ${emplacement.armoire} | Couloir: ${emplacement.couloir} | Etagère: ${emplacement.etagere}`;
  readonly stringifySysteme = (systeme: Systeme): string => `Nom: ${systeme.nom} | Version: ${systeme.version} | Distribution: ${systeme.distribution}`;


  constructor(
    protected emplacementService: EmplacementService,
    protected comptedaccesService: ComptedaccesService,
    protected systemeService: SystemeService,
    private serveurService: ServeurService,
    private applicationService:ApplicationService,
    protected router: Router
  ) {}



  ngOnInit(): void {
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


  servSubmited (): void{
      console.log("FORMVALUE=========",this.servForm.value);
      const serveur: Serveur | undefined = this.createForm();
      this.serveurService.create(serveur!)
        .subscribe(
        (res) => {
          console.log("Savegarder avec succès",res);
          this.router.navigateByUrl("/admin/serveurs/liste").then();
        },
        (err)=>{
          console.log("Erreur lors de la sauvegarde",err);
        }
      )
    }

    createForm(): Serveur | undefined {
    const serveur = new Serveur();
     return {
       ...new Serveur(),
       nom: this.servForm.get("nom")?.value,
       type: this.servForm.get("type")?.value,
       adresseip: this.servForm.get("adresseip")?.value,
       etat: this.servForm.get("etat")?.value,
       createdAt:  this.servForm.get("createdAt")?.value,
       emplacement: this.servForm.get("emplacement")?.value,
       id: undefined,
       systeme: this.servForm.get("systeme")?.value,
       updatedAt:  this.servForm.get("updatedAt")?.value
     };


    }


}
