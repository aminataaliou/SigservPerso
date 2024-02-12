import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmplacementService} from "../../../shareds/services/emplacement.service";
import {Emplacement} from "../../../shareds/models/emplacement";
import {Router} from "@angular/router";
import {Datacenter} from "../../../shareds/models/datacenter";
import {DatacenterService} from "../../../shareds/services/datacenter.service";

@Component({
  selector: 'app-nouveau',
  templateUrl: './nouveau.component.html',
  styleUrls: ['./nouveau.component.less']
})
export class NouveauComponent implements OnInit{

  datacenter:Datacenter[]
  readonly stringifyDatacenter = (datacenter: Datacenter): string => ` ${datacenter.nom} `;


  emplForm = new FormGroup({
    datacenter: new FormControl(null,Validators.required),
    couloir: new FormControl(``, Validators.required),
    armoire: new FormControl(``, Validators.required),
    etagere: new FormControl(``, Validators.required),

  })

  ngOnInit(): void {
    this.findAllDatacenter();
  }

  constructor(
    private emplacementService: EmplacementService,
    protected router: Router,
    private datacenterService:DatacenterService,
  ) {}

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

  emplSubmited(): void {
    const emplacement: Emplacement | undefined = this.createForm();
    console.log(emplacement);
    this.emplacementService.create(emplacement!)
      .subscribe(
        (res) => {
          console.log("Savegarder avec succès", res);
          this.router.navigateByUrl("/admin/emplacements/liste").then();
        },
        (err) => {
          console.log("Erreur lors de la sauvegarde", err);
        }
      )
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
      id: null,
    };
  }


}
