import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {TUI_DEFAULT_MATCHER, TuiBooleanHandler, tuiPure} from '@taiga-ui/cdk';
import { Systeme } from 'src/app/shareds/models/systeme';
import { Tags } from 'src/app/shareds/models/tags';
import { SystemeService } from 'src/app/shareds/services/systeme.service';
import { TagsService } from 'src/app/shareds/services/tags.service';



@Component({
  selector: 'app-nouveau',
  templateUrl: './nouveau.component.html',
  styleUrls: ['./nouveau.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NouveauComponent implements OnInit{

  sysForm = new FormGroup({
    nom: new FormControl(``, Validators.required),
    version: new FormControl(``, Validators.required),
    distribution: new FormControl(``, Validators.required),
    tags: new FormControl(null),
  });

  tags:Tags [] = [];
  readonly stringifyTags = (tags: Tags): string => ` ${tags.nom} `;

  constructor(
    protected router: Router,
    private systemeService:SystemeService,
    protected tagsService:TagsService
    ){}
  ngOnInit(): void {
    this.findAllTags()
  }

  findAllTags(): void {
    this.tagsService.query()
      .subscribe(
        (res) => {
          console.log("TAGS");
          this.tags = res.body ?? [];
        },
        (err)=>{

        }
      )
  }

  search: string | null = '';

    @tuiPure
    filter(search: string | null): Tags[] {
        return this.tags.filter(tags => TUI_DEFAULT_MATCHER(tags, search || ''));
    }

    sysSubmited (){
      console.log(this.sysForm.value);
      const systeme: Systeme | undefined = this.createForm();
      this.systemeService.create(systeme!)
        .subscribe(
        (res) => {
          console.log("Savegarder avec succès");
          console.log(res);
          this.router.navigateByUrl("/admin/systemes/liste").then();
        },
        (err)=>{
          console.log("Erreur lors de la sauvegarde");
        }
      )
    }

    createForm(): Systeme | undefined {
      const systeme = new Systeme();
       return {
         ...new Systeme(),

         nom: this.sysForm.get("nom")?.value,
         version: this.sysForm.get("version")?.value,
         distribution: this.sysForm.get("distribution")?.value,
         tags: this.sysForm.get("tags")?.value,
         serveurs: null,
         createdAt:  null,
         updatedAt:  null
       }
      }
}
