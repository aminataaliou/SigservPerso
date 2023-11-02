import {Component, Inject, Injector} from '@angular/core';
import {Emplacement} from "../../../shareds/models/emplacement";
import {EmplacementService} from "../../../shareds/services/emplacement.service";
import {Application} from "../../../shareds/models/application";
import {TuiAlertService, TuiDialogService} from "@taiga-ui/core";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {ConfirmationDeleteComponent} from "../../confirmation-delete/confirmation-delete.component";

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.less']
})
export class ListeComponent {

  constructor(
    private emplacementService:EmplacementService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    @Inject(Injector) private readonly injector: Injector,
  ) {
  }
  search = '';

  readonly columns = ['nom', 'couloir','armoire','etagere','createdAt','actions'];
  emplacements : readonly Emplacement[]=[];

  ngOnInit() {
    this.query();
  }

  query():void{
    this.emplacementService.query().subscribe(
      (res) => {
        this.emplacements = res.body ?? [];
        console.log(this.emplacements);
      },
      (err) => { }
    )
  }

  showDialog(emplacement: Emplacement): void {

    this.dialogs.open<string>(
      new PolymorpheusComponent(ConfirmationDeleteComponent, this.injector),
      {
        data: 237,
        dismissible: true,
        label: 'Demande de confirmation',
      },
    ).subscribe({
      next: (data) => {
        if(data === 'OK'){
          this.deleteEmplacementById(emplacement);

        }
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });

  }

  private deleteEmplacementById(emplacement: Emplacement) {
    this.emplacementService.delete(emplacement.id!)
      .subscribe(
        () => {
          this.query();
        },
        (err) => {
          this.alerts.open(`Une erreur s'est produite lors de la suppression de l'emplacement <<${emplacement.datacenter.nom}>>`);

        }
      );
    this.alerts.open(`l'emplacement <<${emplacement.datacenter.nom}>> a été supprimé avec succès`,{
      status: 'success'
    }).subscribe();
  }
}
