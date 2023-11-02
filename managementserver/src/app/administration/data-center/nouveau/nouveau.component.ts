import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatacenterService} from "../../../shareds/services/datacenter.service";
import {Router} from "@angular/router";
import {Datacenter} from "../../../shareds/models/datacenter";
import {Emplacement} from "../../../shareds/models/emplacement";

@Component({
  selector: 'app-nouveau',
  templateUrl: './nouveau.component.html',
  styleUrls: ['./nouveau.component.less']
})
export class NouveauComponent {


  dataForm = new FormGroup({
    nom: new FormControl(``),
    pays: new FormControl(``, Validators.required),
    ville: new FormControl(``, Validators.required),
    quartier: new FormControl(``, Validators.required),

  })

  constructor(
    private datacenterService:DatacenterService,
    protected router: Router
  ) {}

  dataSubmited(): void {
    const datacenter: Datacenter | undefined = this.createForm();
    this.datacenterService.create(datacenter!)
      .subscribe(
        (res) => {
          console.log("Savegarder avec succès", res);
          this.router.navigateByUrl("/admin/data-center/liste").then();
        },
        (err) => {
          console.log("Erreur lors de la sauvegarde", err);
        }
      )
  }

  createForm(): Datacenter | undefined {
    const datacenter = new Datacenter();
    return {
      ...new Datacenter(),
      nom:this.dataForm.get("nom")?.value,
      pays:this.dataForm.get("pays")?.value,
      ville:this.dataForm.get("ville")?.value,
      quartier:this.dataForm.get("quartier")?.value,
      createdAt: this.dataForm.get("createdAt")?.value,
      updatedAt: this.dataForm.get("updatedAt")?.value,
      id: null,
    };
  }
}
