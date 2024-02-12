import {Component, OnInit} from '@angular/core';
import {Emplacement} from "../../../shareds/models/emplacement";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {EmplacementService} from "../../../shareds/services/emplacement.service";
import {Datacenter} from "../../../shareds/models/datacenter";
import {DatacenterService} from "../../../shareds/services/datacenter.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit{

  id:number|undefined;
  emplacement:Emplacement|undefined;

  datacenter:Datacenter[]
  readonly stringifyDatacenter = (datacenter: Datacenter): string => ` ${datacenter.nom} `;

  emplForm=this.fb.group({
    datacenter: [],
    couloir: [],
    armoire:[],
    etagere: [],
    id:[],
  })
  constructor(
    private activatedroute:ActivatedRoute,
    protected fb: FormBuilder,
    private router:Router,
    private emplacementService:EmplacementService,
    private datacenterService: DatacenterService,
  ) {}

  ngOnInit(): void {
    this.activatedroute.params.subscribe((params) =>{
      if(params['id']){
        this.findEmplacementById(Number.parseInt(params['id']))}
    })
    console.log("data======",this.id);
    this.findAllDatacenter();
  }

  findAllDatacenter(): void {
    this.datacenterService.query()
      .subscribe(
        (res) => {
          console.log("Datacenter");
          this.datacenter = res.body ?? [];
        },
        (err)=>{

        }
      )
  }

  updateForm(emplacement:Emplacement){
    console.log("Before Update")
    console.log(this.emplacement)
    this.emplForm.patchValue({
      id:emplacement.id,
      datacenter:emplacement.datacenter,
      armoire: emplacement.armoire,
      etagere:emplacement.etagere,
      couloir: emplacement.couloir,
    })
    console.log("After Update")
    console.log(this.emplForm.value)
  }
  findEmplacementById(id:number){
    this.emplacementService.findById(id).subscribe(
      (res) => {
        console.log("EMPLACEMENTS",res);
        this.emplacement = res.body ?? undefined;
        if (this.emplacement) this.updateForm(this.emplacement);
        console.log(this.emplacement)
      },
      (err)=>{}
    )
    this.updateForm(this.emplacement!)
  }


  createForm(): Emplacement | undefined {
    return {
      ...new Emplacement(),
      armoire: this.emplForm.get("armoire")?.value,
      etagere: this.emplForm.get("etagere")?.value,
      couloir: this.emplForm.get("couloir")?.value,
      createdAt: this.emplForm.get("createdAt")?.value,
      updatedAt: this.emplForm.get("updatedAt")?.value,
      datacenter: this.emplForm.get("datacenter")?.value,
      id: this.emplForm.get("id")?.value,
    };
  }

  emplSubmited(){
    console.log("Emplacement",this.emplForm)
    const emplacement : Emplacement |undefined = this.createForm();
    this.emplacementService.update(emplacement).subscribe(
      (res) => {
        console.log("mise à jour effectué avec succès",res);
        this.router.navigateByUrl("/admin/emplacements/liste").then();
      },
      (err)=>{
        console.log("Erreur lors de la mise à jour",err);
      }
    )
  }
}
