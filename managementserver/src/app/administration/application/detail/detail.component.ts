import {Component, OnInit} from '@angular/core';
import {ApplicationService} from "../../../shareds/services/application.service";
import {Application} from "../../../shareds/models/application";
import {TUI_IS_ANDROID, TUI_IS_IOS} from "@taiga-ui/cdk";
import {ActivatedRoute, Router} from "@angular/router";
import {ServeurService} from "../../../shareds/services/serveur.service";
import {Serveur} from "../../../shareds/models/serveur";
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
export class DetailComponent implements OnInit {

  activeItemIndex = 0;
  id:number | undefined;
  application: Application | undefined;

  serveurByApplicationId: readonly Serveur[] = [];
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

  ngOnInit(): void {
    this.activatedroute.params.subscribe((params) =>{
      if(params['id']){
        this.id=params['id'];
        this.findApplicationById(this.id!);
        this.findAllServeur();
        this.findServeurByApplicationId(this.id!)
      }
    })
    console.log("data======",this.id);
  }

  constructor(
    private applicationService:ApplicationService,
    private activatedroute: ActivatedRoute,
    protected router: Router,
    private serveurService:ServeurService,
    protected fb: FormBuilder
  ) {}


  findApplicationById(id:number){
    this.applicationService.findById(id).subscribe(
      (res) => {
        console.log("APPLICATIONS",res);
        this.application = res.body ?? undefined;
        console.log(this.application)
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

  findServeurByApplicationId(id:number):void{
    this.serveurService.findServeurByApplicationId(id).subscribe(
      (res) => {
        console.log("ServeurByApplicationId",res.body);
        this.serveurByApplicationId = res.body ?? [];
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
    console.log(" APPLI SERV SUBMIT",this.serveurForm.get('serveurs')?.value);
    const serveurs: Serveur[] = this.serveurForm.get('serveurs')?.value;
    this.applicationService.addServeursToApplicationById(this.application, serveurs)
      .subscribe(
        (res) => {
          console.log("Savegarder avec succès",res);
          this.open = false;
          this.serveurForm.patchValue({
            serveurs: []
          })
          this.findServeurByApplicationId(this.application.id);
        },
        (err)=>{
          console.log("Erreur lors de la sauvegarde",err);
        }
      )
  }
}
