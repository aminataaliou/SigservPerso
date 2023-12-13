import {Component, OnInit} from '@angular/core';
import {ApplicationService} from "../../../shareds/services/application.service";
import {Application} from "../../../shareds/models/application";
import {TUI_IS_ANDROID, TUI_IS_IOS} from "@taiga-ui/cdk";
import {ActivatedRoute, Router} from "@angular/router";
import {ServeurService} from "../../../shareds/services/serveur.service";
import {Serveur} from "../../../shareds/models/serveur";
import {FormBuilder} from "@angular/forms";
import {Tags} from "../../../shareds/models/tags";
import {TagsService} from "../../../shareds/services/tags.service";



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

  readonly columnstags = ['nom', 'createdAt'];
 tagsByApplicationId: readonly Tags[] = [];
  tag:Tags | undefined;
  open1=false;
  tags:readonly Tags[];
  readonly stringifyTags = (tags: Tags): string => `Nom: ${tags.nom} `;

  serveurByApplicationId: readonly Serveur[] = [];
  readonly columnsServeur = ['nom', 'etat', 'adresseip', 'systeme', 'createdAt'];

  serveurs: readonly Serveur[] =[];
  readonly stringifyServeur = (serveur: Serveur): string => `Nom: ${serveur.nom} | Etat: ${serveur.etat} | Adresse IP: ${serveur.adresseip} | Systeme: ${serveur.systeme}   | CreatedAt: ${serveur.createdAt}`;
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
    {
      text: 'Tags',
      icon: 'tuiIconTag',
    },
  ];

  serveurForm = this.fb.group({
    serveurs: [],
  });
  tagForm = this.fb.group({
   tags:[],
  })

  ngOnInit(): void {
    this.activatedroute.params.subscribe((params) =>{
      if(params['id']){
        this.id=params['id'];
        this.findApplicationById(this.id!);
        this.findAllServeur();
        this.findServeurByApplicationId(this.id!);
        this.findAllTags();
        this.findTagsByApplicationId(this.id!)
      }
    })
    console.log("data======",this.id);
  }

  constructor(
    private applicationService:ApplicationService,
    private activatedroute: ActivatedRoute,
    protected router: Router,
    private serveurService:ServeurService,
    protected fb: FormBuilder,
    private tagsService:TagsService
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

  showDialogTags(): void {
    this.open1 = true;
  }

  findAllTags(): void{
    this.tagsService.query().subscribe(
      (res)=> {
        console.log("TAGS");
        this.tags = res.body ?? [];
      }
    )
  }

  findTagsByApplicationId(id:number):void{
    this.tagsService.findTagsByApplicationId(id).subscribe(
      (res) => {
        console.log("TagsByApplicationId",res.body);
        this.tagsByApplicationId = res.body ?? [];
      },
      (err)=>{}
    )
  }
  tagsSubmit(){
    console.log(" APPLI TAGS SUBMIT",this.tagForm.get('tags')?.value);
    const tags: Tags[] = this.tagForm.get('tags')?.value;
    this.applicationService.addTagsToApplicationById(this.application, tags)
      .subscribe(
        (res) => {
          console.log("Savegarder avec succès",res);
          this.open1 = false;
          this.tagForm.patchValue({
            tags: []
          })
          this.findTagsByApplicationId(this.application.id);
        },
        (err)=>{
          console.log("Erreur lors de la sauvegarde",err);
        }
      )
  }
}
