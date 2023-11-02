import {Component, OnInit} from '@angular/core';
import {Application} from "../../../shareds/models/application";
import {Emplacement} from "../../../shareds/models/emplacement";
import {TUI_IS_ANDROID, TUI_IS_IOS} from "@taiga-ui/cdk";
import {ActivatedRoute, Router} from "@angular/router";
import {EmplacementService} from "../../../shareds/services/emplacement.service";
import {Serveur} from "../../../shareds/models/serveur";
import {ServeurService} from "../../../shareds/services/serveur.service";
import {FormBuilder} from "@angular/forms";

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
  emplacement:Emplacement | undefined;
  activeItemIndex = 0;
  serveurByEmplacementId: readonly Serveur[] = [];
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
    private emplacementService:EmplacementService,
    private serveurService:ServeurService,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedroute.params.subscribe((params) =>{
      if(params['id']){
        this.id=params['id'];
        this.findEmplacementById(this.id!);
        this.findServeurByEmplacementId(this.id!)
      }
    })
    console.log("data======",this.id);
  }

  findAllServeur(): void{
    this.serveurService.query().subscribe(
      (res)=> {
        console.log("SERVEURS");
        this.serveurs = res.body ?? [];
      }
    )
  }

  findEmplacementById(id:number){
    this.emplacementService.findById(id).subscribe(
      (res) => {
        console.log("EMPLACEMENTS",res);
        this.emplacement = res.body ?? undefined;
        console.log(this.emplacement)
      },
      (err)=>{}
    )
  }

  findServeurByEmplacementId(id:number):void{
    this.serveurService.findServeurByEmplacementId(id).subscribe(
      (res) => {
        console.log("ServeurByEmplacementId",res.body);
        this.serveurByEmplacementId = res.body ?? [];
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

  serveurSubmit(){}
}
