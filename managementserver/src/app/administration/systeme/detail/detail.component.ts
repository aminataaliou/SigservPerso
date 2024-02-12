import {Component, OnInit} from '@angular/core';
import {ServeurService} from "../../../shareds/services/serveur.service";
import {SystemeService} from "../../../shareds/services/systeme.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {Application} from "../../../shareds/models/application";
import {Systeme} from "../../../shareds/models/systeme";
import {Serveur} from "../../../shareds/models/serveur";
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
  activeItemIndex = 0;
  id:number | undefined;
  systeme: Systeme | undefined;

  serveurs: readonly Serveur[] =[];
  readonly stringifyServeur = (serveur: Serveur): string => `Nom: ${serveur.nom} | Etat: ${serveur.etat} | Adresse IP: ${serveur.adresseip} | Systeme: ${serveur.systeme}   | CreatedAt: ${serveur.createdAt}`;
  value: Serveur[] = [];
  open=false;
  serveurBySystemeId: readonly Serveur[] = [];
  readonly columnsServeur = ['nom', 'etat', 'adresseip', 'systeme', 'createdAt'];

  constructor(
    private serveurService:ServeurService,
    private systemeService:SystemeService,
    private activatedroute: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedroute.params.subscribe((params) =>{
      if(params['id']){
        this.id=params['id'];
        this.findSystemeById(this.id!);
        this.findAllServeur();
        this.findServeurBySystemeId(this.id!)
      }
    })
    console.log("data======",this.id);
  }

  findSystemeById(id:number){
    this.systemeService.findById(id).subscribe(
      (res) => {
        console.log("SYSTEMES",res);
        this.systeme = res.body ?? undefined;
        console.log(this.systeme)
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

  findServeurBySystemeId(id:number):void{
    this.serveurService.findServeurBySystemeId(id).subscribe(
      (res) => {
        console.log("ServeurBySystemeId",res.body);
        this.serveurBySystemeId = res.body ?? [];
      },
      (err)=>{}
    )
  }

  showDialogServeur(): void {
    this.open = true;
  }
  serveurSystemForm = this.fb.group({
    serveurs: [],
  });

  serveurSubmit(){
    // console.log(" Serveur Compte SUBMIT",this.serveurSystemForm.get('serveurs')?.value);
    // const serveur: Serveur []= this.serveurSystemForm.get('serveurs')?.value;
    // this.systemeService.addServeurToSystemesById(this.systeme, serveur)
    //   .subscribe(
    //     (res) => {
    //       console.log("Savegarder avec succès",res);
    //       this.open = false;
    //       this.serveurSystemForm.patchValue({
    //         serveurs: []
    //       })
    //       this.findServeurBySystemeId(this.systeme.id);
    //     },
    //     (err)=>{
    //       console.log("Erreur lors de la sauvegarde",err);
    //     }
    //   )
  }

}
