import { Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ServeurService} from "../../../shareds/services/serveur.service";
import {Serveur} from "../../../shareds/models/serveur";
import {TuiAlertService} from "@taiga-ui/core";
import {TUI_IS_ANDROID, TUI_IS_IOS} from "@taiga-ui/cdk";
import {Application} from "../../../shareds/models/application";
import {ApplicationService} from "../../../shareds/services/application.service";
import {FormBuilder, FormControl, FormControlName, FormGroup} from "@angular/forms";
import {ComptedaccesService} from "../../../shareds/services/comptedacces.service";
import {Comptedacces} from "../../../shareds/models/comptedacces";
import application from "@angular-devkit/build-angular/src/tools/babel/presets/application";


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
export class DetailComponent implements  OnInit{

  id:number | undefined;
  serveur: Serveur | undefined;
  activeItemIndex = 0;
  applicationsByServeurId: readonly Application[] = [];
  readonly columns = ['nom','type','etat','adresseIp','port','url','createdAt'];

  serveurVirtuelByServeurId: readonly Serveur[] = [];
  readonly columnsServeur = ['nom', 'etat', 'adresseip', 'systeme', 'createdAt'];

  compteByServeurId: readonly Comptedacces[] = [];
  readonly columnsCompte = ['nom', 'password', 'createdAt'];



  readonly items = [
    {
      text: 'Information Générale',
      icon: 'tuiIconInfo',
    },
    {
      text: 'Serveurs Virtuels',
      icon: 'tuiIconServer',
    },
    {
      text: 'Emplacement',
      icon: 'tuiIconMapPin',
    },
    {
      text: 'Application',
      icon: 'tuiIconMonitor',
    },
    {
      text: 'Compte D\'accès',
      icon: 'tuiIconUser',
    },
  ];
  comptedacces : readonly Comptedacces[] =[];
  value2:Comptedacces[] =[];
  open2 = false;

  applications: readonly Application[] = [];
  readonly stringifyApplication = (application: Application): string => `NOM: ${application.nom} | TYPE: ${application.type} | ETAT: ${application.etat} | ADRESSE IP: ${application.adresseIp} | PORT: ${application.port} | URL: ${application.url}  | CreatedAt: ${application.createdAt}`;
  value: Application[] = [];
  open = false;

  serveurs: readonly Serveur[] =[];
  readonly stringifyServeurVirtuel = (serveur: Serveur): string => `Nom: ${serveur.nom} | Etat: ${serveur.etat} | Adresse IP: ${serveur.adresseip} | Systeme: ${serveur.systeme}   | CreatedAt: ${serveur.createdAt}`;
  open1=false;

  constructor(
    private activatedroute: ActivatedRoute,
    private serveurService:ServeurService,
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private applicationService : ApplicationService,
    private comptedaccesService : ComptedaccesService,
    protected router: Router,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedroute.params.subscribe((params) =>{
      if(params['id']){
        this.id=params['id'];
        this.findServeurById(this.id!);
        this.findAllApplication();
        this.findApplicationByServeurId(this.id!);
        this.findComptedaccesByServeurId(this.id!);
        this.findAllServeur();
        this.findServeurVirtuelByServeurId(this.id!);
      }
    })
    console.log("data======",this.id);
  }

  findAllApplication(): void {
    this.applicationService.query()
      .subscribe(
        (res) => {
          console.log("SERVAPPLICATION");
          this.applications = res.body ?? [];
        },
        (err)=>{}
      )
  }

  findAllServeur(): void{
    this.serveurService.query().subscribe(
      (res)=> {
        console.log("SERVEURVIRTUELLLLL");
        this.serveurs = res.body ?? [];
      }
    )
  }

  findServeurById(id:number){
    this.serveurService.findById(id).subscribe(
      (res) => {
        console.log("SERVEURS",res);
        this.serveur = res.body ?? undefined;
        console.log(this.serveur)
      },
      (err)=>{}
    )
  }
  findApplicationByServeurId(id:number){
    this.applicationService.findApplicationByServeurId(id).subscribe(
      (res) => {
        console.log("ApplicationByServeurId",res.body);
        this.applicationsByServeurId = res.body ?? [];
      },
      (err)=>{}
    )
      }
  findServeurVirtuelByServeurId(id:number){
    this.serveurService.findServeurVirtuelByServeurId(id).subscribe(
      (res) => {
        console.log("ServeurVirtuelByServeurId",res.body);
        this.serveurVirtuelByServeurId = res.body ?? [];
      },
      (err)=>{}
    )
  }

  findComptedaccesByServeurId(id:number){
    this.comptedaccesService.findComptedaccesByServeurId(id).subscribe(
      (res) => {
        console.log("CompteByServeurId",res.body);
        this.compteByServeurId = res.body ?? [];
      },
      (err)=>{}
    )
  }

  showDialogCompte(): void {
    this.open2 = true;
  }

  showDialogAppli(): void {
    this.open = true;
  }
  servAppliForm = this.fb.group({
    applications: [],
  });
  servAppliSubmited(): void{
    console.log("SERV APPLI SUBMIT",this.servAppliForm.get('applications')?.value);
    const applications: Application[] = this.servAppliForm.get('applications')?.value;
    this.serveurService.addApplicationsToServerById(this.serveur, applications)
      .subscribe(
        (res) => {
          console.log("Savegarder avec succès",res);
          this.open = false;
          this.servAppliForm.patchValue({
            applications: []
          })
          this.findApplicationByServeurId(this.serveur.id);
        },
        (err)=>{
          console.log("Erreur lors de la sauvegarde",err);
        }
      )
  }

  showDialogVirtuel(): void {
    this.open1 = true;
  }
  serveurVirtuelForm = this.fb.group({
    serveurs: [],
  });
  servVirtuelSubmit(){
    console.log("SERV VIRTUEL SUBMIT 000000",this.serveurVirtuelForm.get('serveurs')?.value);
    const serveurs :Serveur[] = this.serveurVirtuelForm.get('serveurs')?.value;
    this.serveurService.addServeursToServerById(this.serveur,serveurs).subscribe(
      (res) => {
        console.log("Savegarder avec succès",res);
        this.open1 = false;
        this.serveurVirtuelForm.patchValue({
          serveurs: []
        })
        this.findServeurVirtuelByServeurId(this.serveur.id);
      },
      (err)=>{
        console.log("Erreur lors de la sauvegarde",err);
      }
    )
  }

}


