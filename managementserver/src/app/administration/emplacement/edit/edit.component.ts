import {Component, OnInit} from '@angular/core';
import {Emplacement} from "../../../shareds/models/emplacement";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {EmplacementService} from "../../../shareds/services/emplacement.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit{

  id:number|undefined;
  emplacement:Emplacement|undefined;

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
  ) {}

  ngOnInit(): void {
    this.activatedroute.params.subscribe((params) =>{
      if(params['id']){
        this.findEmplacementById(Number.parseInt(params['id']))}
    })
    console.log("data======",this.id);
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

  emplSubmited(){
    console.log("Emplacement",this.emplForm)
    this.emplacementService.update(this.emplacement).subscribe(
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
