import {Component, OnInit} from '@angular/core';
import {Emplacement} from "../../../shareds/models/emplacement";
import {Datacenter} from "../../../shareds/models/datacenter";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {DatacenterService} from "../../../shareds/services/datacenter.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit{

  id:number|undefined;
  datacenter:Datacenter|undefined;

  dataForm=this.fb.group({
    nom: [],
    pays: [],
    ville:[],
    quartier: [],
    id:[],
    emplacements:[],

  })

  constructor(

    private activatedroute:ActivatedRoute,
    protected fb: FormBuilder,
    private router:Router,
    private datacenterService:DatacenterService
  ) {}

  ngOnInit(): void {

    this.activatedroute.params.subscribe((params) =>{
      if(params['id']){
        this.findDatacenterById(Number.parseInt(params['id']))}
    })
    console.log("data======",this.id);
  }


  updateForm(datacenter:Datacenter){
    console.log("Before Update")
    console.log(this.datacenter)

    this.dataForm.patchValue({
      id:datacenter.id,
      nom: datacenter.nom,
      pays: datacenter.pays,
      ville: datacenter.ville,
      quartier: datacenter.quartier,
      emplacements: datacenter.emplacement
    })
    console.log("After Update")
    console.log(this.dataForm.value)
  }

  findDatacenterById(id:number){
    this.datacenterService.findById(id).subscribe(
      (res) => {
        console.log("DATA_CENTER",res);
        this.datacenter = res.body ?? undefined;
        if (this.datacenter) this.updateForm(this.datacenter);
        console.log(this.datacenter)

      },
      (err)=>{}
    )
    this.updateForm(this.datacenter!)
  }

  dataSubmited(){
    console.log("DATA_CENTER",this.dataForm)
    this.datacenterService.update(this.datacenter).subscribe(
      (res) => {
        console.log("mise à jour effectué avec succès",res);
        this.router.navigateByUrl("/admin/data-center/liste").then();
      },
      (err)=>{
        console.log("Erreur lors de la mise à jour",err);
      }
    )
  }
}
