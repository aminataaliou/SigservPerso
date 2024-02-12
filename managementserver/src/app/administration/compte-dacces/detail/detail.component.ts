import {Component, OnInit} from '@angular/core';
import {Comptedacces} from "../../../shareds/models/comptedacces";
import {ActivatedRoute, Router} from "@angular/router";
import {ComptedaccesService} from "../../../shareds/services/comptedacces.service";
import {Serveur} from "../../../shareds/models/serveur";
import {ServeurService} from "../../../shareds/services/serveur.service";
import {FormBuilder} from "@angular/forms";
import {TUI_IS_ANDROID, TUI_IS_IOS} from "@taiga-ui/cdk";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
  providers: [
    {
      provide: TUI_IS_IOS,
      useValue: true,
    },
    {
      provide: TUI_IS_ANDROID,
      useValue: false,
    },
  ],
})
export class DetailComponent implements OnInit{

  id:number | undefined;
  comptedacces:Comptedacces | undefined;
  activeItemIndex = 0;
  serveurByCompteId: readonly Serveur[] = [];
  readonly columnsServeur = ['nom', 'etat', 'adresseip', 'systeme', 'createdAt'];

  serveurs: readonly Serveur[] =[];
  readonly stringifyServeur = (serveur: Serveur): string => `Nom: ${serveur.nom} | Etat: ${serveur.etat} | Adresse IP: ${serveur.adresseip} | Systeme: ${serveur.systeme}   | CreatedAt: ${serveur.createdAt}`;
  value: Serveur[] = [];
  open=false;
  readonly items = [
    {
      text: 'Information Générale',
      icon: 'tuiIconInfo',
    },
    {
      text: 'Serveurs',
      icon: 'tuiIconServer',
    },
  ];

  constructor(
    private activatedroute: ActivatedRoute,
    protected router: Router,
    private comptedaccesService:ComptedaccesService,
    private serveurService:ServeurService,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedroute.params.subscribe((params) =>{
      if(params['id']){
        this.id=params['id'];
        this.findComptedaccesById(this.id!);
        this.findServeurByCompteId(this.id!);
        this.findAllServeur();
      }
    })
    console.log("data======",this.id);
  }

  findComptedaccesById(id:number){
    this.comptedaccesService.findById(id).subscribe(
      (res) => {
        console.log("COMPTES-ACCES",res);
        this.comptedacces = res.body ?? undefined;
        console.log(this.comptedacces)
      },
      (err)=>{}
    )
  }

  findAllServeur(): void{
    this.serveurService.query().subscribe(
      (res)=> {
        console.log("SERVEURS");
        this.serveurs = res.body ?? [];
      }
    )
  }

  findServeurByCompteId(id:number):void{
    this.serveurService.findServeurByCompteId(id).subscribe(
      (res) => {
        console.log("ServeurByEmplacementId",res.body);
        this.serveurByCompteId = res.body ?? [];
      },
      (err)=>{}
    )
  }

  showDialogServeur(): void {
    this.open = true;
  }
  serveurForm = this.fb.group({
    serveurs: [],
  });

  serveurSubmit(){
    console.log(" COMPTE SERV SUBMIT",this.serveurForm.get('serveurs')?.value);
    const serveurs: Serveur[] = this.serveurForm.get('serveurs')?.value;
    this.comptedaccesService.addServeursToComptedaccesById(this.comptedacces, serveurs)
      .subscribe(
        (res) => {
          console.log("Savegarder avec succès",res);
          this.open = false;
          this.serveurForm.patchValue({
            serveurs: []
          })
          this.findServeurByCompteId(this.comptedacces.id);
        },
        (err)=>{
          console.log("Erreur lors de la sauvegarde",err);
        }
      )
  }
}
