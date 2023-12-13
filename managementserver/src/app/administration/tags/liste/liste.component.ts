import {Component, Inject, Injector, OnInit} from '@angular/core';
import {TuiAlertService, TuiDialogService} from "@taiga-ui/core";
import {TagsService} from "../../../shareds/services/tags.service";
import {Tags} from "../../../shareds/models/tags";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {ConfirmationDeleteComponent} from "../../confirmation-delete/confirmation-delete.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.less']
})
export class ListeComponent implements OnInit{

  search = '';
  readonly columns = ['nom', 'createdAt', 'actions'];
  tags: readonly Tags[] = [];
  tag:Tags | undefined;
  open = false;
  open1 = false;
  tagsForm = new FormGroup({
    nom: new FormControl(``, Validators.required),
    id: new FormControl(``),
  });

  tagForm = this.fb.group({
    id: [],
    nom: [],
  })

  ngOnInit() {
    this.query();
    this.activatedroute.params.subscribe((params) => {
      if (params['id']) {
        this.findTagsById(Number.parseInt(params['id']))
      }
    })
  }

  constructor(
    private tagsService: TagsService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    @Inject(Injector) private readonly injector: Injector,
    protected router: Router,
    protected fb: FormBuilder,
    private activatedroute: ActivatedRoute,
  ) {}

  query(): void {
    this.tagsService.query().subscribe(
      (res) => {
        this.tags = res.body ?? [];
        console.log(this.tags);
      },
      (err) => {
      }
    )
  }

  showDialog1(tags: Tags): void {
    this.dialogs.open<string>(
      new PolymorpheusComponent(ConfirmationDeleteComponent, this.injector),
      {
        data: 237,
        dismissible: true,
        label: 'Demande de confirmation',
      },
    ).subscribe({
      next: (data) => {
        if (data === 'OK') {
          this.deleteTagsById(tags);
        }
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }

  private deleteTagsById(tags: Tags) {
    this.tagsService.delete(tags.id!)
      .subscribe(
        () => {
          this.query();
        },
        (err) => {
          this.alerts.open(`Une erreur s'est produite lors de la suppression du tags <<${tags.nom}>>`);
        }
      );
    this.alerts.open(`le tags <<${tags.nom}>> a été supprimé avec succès`, {
      status: 'success'
    }).subscribe();
  }

  showDialog(): void {
    this.open = true;
  }
  showDialogTags(): void {
    this.open1 = true;
  }

  tagsSubmited(): void {
    const tags: Tags | undefined = this.createForm();
    this.tagsService.create(tags!)
      .subscribe(
        (res) => {
          console.log("Savegarder avec succès", res);
          this.open = false;
          this.query();
          this.tagsForm.reset();
        },
        (err) => {
          console.log("Erreur lors de la sauvegarde", err);
        }
      )
  }

  createForm(): Tags | undefined {
    const tags = new Tags();
    return {
      ...new Tags(),
      nom: this.tagsForm.get("nom")?.value,
      id: null,
    };
  }

  updateForm(tag: Tags) {
    console.log("Before Update")
    console.log(tag)

    this.tagForm.patchValue({
      id: tag.id,
      nom: tag.nom,
    })
    console.log("After Update")
    console.log(this.tagForm.value)
  }

  findTagsById(id: number) {
    if (id) {
      this.tagsService.findById(id).subscribe(
        (res) => {
          this.tag = res.body ?? undefined
          if (this.tag) this.updateForm(this.tag);
        },
        (err) => {
        }
      )
      this.updateForm(this.tag!)
    }
  }
  tagsSubmit() {
    console.log("TAAAAAGGGGGSSSS", this.tagForm)
    this.tagsService.update(this.tag)
      .subscribe(
        (res) => {
          console.log("mise à jour effectué avec succès", res);
          this.open1=false;
          this.router.navigateByUrl("/admin/tags/liste").then();
        },
        (err) => {
          console.log("Erreur lors de la mise à jour", err);
        }
      )
  }
}
