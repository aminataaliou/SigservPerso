import {ChangeDetectionStrategy, Component, Inject, Injector} from '@angular/core';
import { TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';
import {TuiAlertService, TuiDialogContext, TuiDialogService} from '@taiga-ui/core';
import { TUI_ARROW } from '@taiga-ui/kit';
import { BehaviorSubject, combineLatest } from 'rxjs';
import {debounceTime, filter, map, share, startWith, switchMap} from 'rxjs/operators';
import { Serveur } from 'src/app/shareds/models/serveur';
import { ServeurService } from 'src/app/shareds/services/serveur.service';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {ConfirmationDeleteComponent} from "../../confirmation-delete/confirmation-delete.component";



@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.less'],
})
export class ListeComponent {

  readonly columns = ['nom', 'type', 'etat', 'adresseip', 'systeme', 'tags', 'createdAt', 'actions'];
  serveurs: readonly Serveur[] = [];
  search = '';

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    @Inject(Injector) private readonly injector: Injector,
    private serveurService: ServeurService
  ) {
  }

  ngOnInit() {
    this.query();
  }



  query(): void {
    this.serveurService.query()
      .subscribe(
        (res) => {
          this.serveurs = res.body ?? [];
          console.log(this.serveurs);
          this.alerts.open(`Vous avez ${this.serveurs.length} serveurs`).subscribe();
        },
        (err) => {
          this.alerts.open(`Vous avez ${this.serveurs.length} serveurs`,).subscribe();
        }
      )
  }



  showDialog(serveur: Serveur): void {

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
          this.deleteServeurById(serveur);
        }
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });

  }

   deleteServeurById(serveur: Serveur) {
      this.serveurService.delete(serveur.id!)
        .subscribe(
          () => {
            this.alerts.open(`le serveur <<${serveur.nom}>> a été supprimé avec succès`,{
              status: 'success'
            }).subscribe();
              this.query();
            console.log("----- END -----");
          },
          (err) => {
            this.alerts.open(`Une erreur s'est produite lors de la suppression du serveur <<${serveur.nom}>>`,{
              status: 'warning'
            }).subscribe();

          }
        );

  }
}


