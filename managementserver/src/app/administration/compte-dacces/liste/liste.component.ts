import {Component, Inject, Injector} from '@angular/core';
import {TuiAlertService, TuiDialogService} from "@taiga-ui/core";
import {ComptedaccesService} from "../../../shareds/services/comptedacces.service";
import {Serveur} from "../../../shareds/models/serveur";
import {Comptedacces} from "../../../shareds/models/comptedacces";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {ConfirmationDeleteComponent} from "../../confirmation-delete/confirmation-delete.component";

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.less']
})
export class ListeComponent {

  readonly columns = ['nom', 'password', 'createdAt', 'actions'];
  comptedacces: readonly Comptedacces[] = [];
  search = '';

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    @Inject(Injector) private readonly injector: Injector,
    private comptedaccesService:ComptedaccesService,
  ) {}

  ngOnInit(){
    this.query();
  }

  query(): void {
    this.comptedaccesService.query()
      .subscribe(
        (res) => {
          this.comptedacces = res.body ?? [];
          console.log(this.comptedacces);
          this.alerts.open(`Vous avez ${this.comptedacces.length} Comptes d'Accès`).subscribe();
        },
        (err) => {
          this.alerts.open(`Vous avez ${this.comptedacces.length} Comptes d'Accès`,).subscribe();
        }
      )
  }

  showDialog(comptedacces: Comptedacces): void {

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

          console.log("----- START -----");
          this.deleteServeurById(comptedacces);
        }
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });

  }



  deleteServeurById(comptedacces: Comptedacces) {
    this.comptedaccesService.delete(comptedacces.id!)
      .subscribe(
        () => {
          this.alerts.open(`Le compte Accès << ${comptedacces.nom} >> a été supprimé avec succès`,{
            status: 'success'
          }).subscribe();
          this.query();
          console.log("----- END -----");
        },
        (err) => {
          this.alerts.open(`Une erreur s'est produite lors de la suppression du compte << ${comptedacces.nom} >>`,{
            status: 'warning'
          }).subscribe();

        }
      );

  }
}
