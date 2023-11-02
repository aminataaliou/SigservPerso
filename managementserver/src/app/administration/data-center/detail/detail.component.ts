import {Component, OnInit} from '@angular/core';
import {TUI_IS_ANDROID, TUI_IS_IOS} from "@taiga-ui/cdk";
import {Emplacement} from "../../../shareds/models/emplacement";
import {Datacenter} from "../../../shareds/models/datacenter";
import {Serveur} from "../../../shareds/models/serveur";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {DatacenterService} from "../../../shareds/services/datacenter.service";
import {EmplacementService} from "../../../shareds/services/emplacement.service";
import {Application} from "../../../shareds/models/application";

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
  datacenter:Datacenter | undefined;
  activeItemIndex = 0;
  emplacementByDatacenterId: readonly Emplacement[] = [];
  readonly columns = ['couloir', 'armoire', 'etagere', 'createdAt'];

  emplacements: readonly Emplacement[] =[];
  readonly stringifyEmplacement = (emplacement: Emplacement): string => `Armoire: ${emplacement.armoire} | Couloir: ${emplacement.couloir} | Etagère: ${emplacement.etagere}`;
  value: Emplacement[] = [];
  open=false;
  readonly items = [
    {
      text: 'Information Générale',
      icon: 'tuiIconInfo',
    },
    {
      text: 'Emplacement',
      icon: 'tuiIconMapPin',
    },
  ];

  constructor(
    private activatedroute: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,
    private datacenterService:DatacenterService,
    private emplacementService:EmplacementService
  ) {}

  ngOnInit(): void {
    this.activatedroute.params.subscribe((params) =>{
      if(params['id']){
        this.id=params['id'];
        this.findAllEmplacement();
        this.findDatacenterById(this.id!)
        this.findEmplacementByDatacenterId(this.id!)
      }
    })
    console.log("data======",this.id);
  }

  findAllEmplacement(): void{
    this.emplacementService.query().subscribe(
      (res)=> {
        console.log("EMPLACEMENTS");
        this.emplacements = res.body ?? [];
      }
    )
  }

  findDatacenterById(id:number){
    this.datacenterService.findById(id).subscribe(
      (res) => {
        console.log("DATA_CENTER",res);
        this.datacenter = res.body ?? undefined;
        console.log(this.datacenter)
      },
      (err)=>{}
    )
  }

  findEmplacementByDatacenterId(id:number):void{
    this.emplacementService.findEmplacementByDatacenterId(id).subscribe(
      (res) => {
        console.log("EmplacementByDatacenterId",res.body);
        this.emplacementByDatacenterId = res.body ?? [];
      },
      (err)=>{}
    )
  }

  showDialogEmplacement(): void {
    this.open = true;
  }
  emplForm = this.fb.group({
    emplacements: [],
  });
  emplSubmit(){
    console.log("EMPLACEMENT SUBMIT",this.emplForm.get('emplacements')?.value);
    const emplacements: Emplacement[] = this.emplForm.get('emplacements')?.value;
    this.datacenterService.addEmplacementsToDatacenterById(this.datacenter, emplacements)
      .subscribe(
        (res) => {
          console.log("Savegarder avec succès",res);
          this.open = false;
          this.emplForm.patchValue({
            emplacements: []
          })
          this.findEmplacementByDatacenterId(this.datacenter.id);
        },
        (err)=>{
          console.log("Erreur lors de la sauvegarde",err);
        }
      )
  }
}
