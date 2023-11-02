import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Systeme } from 'src/app/shareds/models/systeme';
import { SystemeService } from 'src/app/shareds/services/systeme.service';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {TUI_DEFAULT_MATCHER, TuiBooleanHandler, tuiPure} from "@taiga-ui/cdk";
import {Tags} from "../../../shareds/models/tags";
import {Serveur} from "../../../shareds/models/serveur";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {

  id: number|undefined;
  systeme:Systeme |undefined;
  search: string | null = '';
  tags:Tags [] = [];
  @tuiPure
  filter(search: string | null): Tags[] {
    return this.tags.filter(tags => TUI_DEFAULT_MATCHER(tags, search || ''));
  }
  tagValidator: TuiBooleanHandler<string> = tag => !tag.startsWith('Han');


  sysForm=this.fb.group({
    nom: [],
    version: [],
    distribution: [],
    tags: [],
    createdAt:[],
    updatedAt:[],
    id:[]
  })

  constructor(
    private systemeService: SystemeService,
    private activatedroute: ActivatedRoute,
    protected fb: FormBuilder,
    private router:Router
  ){}

  ngOnInit(): void {
    this.activatedroute.params.subscribe((params) =>{
      if(params['id']){
        this.id=params['id'];
        this.findSystemeById(this.id!);

      }
    })
   console.log("data======",this.id);
  }

  findSystemeById(id:number){
    if(id){
      this.systemeService.findById(id).subscribe(
        (res) => {
          this.systeme = res.body ?? undefined
          if (this.systeme) this.updateForm(this.systeme);
        },
        (err)=>{ }
      )
      this.updateForm(this.systeme!)
    }
  }

  updateForm(systeme: Systeme){

    console.log("Before Update")
    console.log(systeme)

    this.sysForm.patchValue({
      id:systeme.id,
      nom: systeme.nom,
      distribution: systeme.distribution,
      version: systeme.version,
      createdAt: systeme.createdAt,
      updatedAt: systeme.updatedAt
    })

    console.log("After Update")
    console.log(this.sysForm.value)
  }


  sysSubmited(){
    console.log("AAAAAAAAAAAAAAAAAAA",this.sysForm)
    this.systemeService.update(this.systeme)
      .subscribe(
        (res) => {
          console.log("mise à jour effectué avec succès",res);
          this.router.navigateByUrl("/admin/systemes/liste").then();
        },
        (err)=>{
          console.log("Erreur lors de la mise à jour",err);
        }
      )
  }

}
