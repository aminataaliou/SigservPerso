import {ChangeDetectionStrategy, Component, Inject, Injector} from '@angular/core';
import { TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';
import { TuiAlertService, TuiDialogService } from '@taiga-ui/core';
import { TUI_ARROW } from '@taiga-ui/kit';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Application } from 'src/app/shareds/models/application';
import { ApplicationService } from 'src/app/shareds/services/application.service';
import {Serveur} from "../../../shareds/models/serveur";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {ConfirmationDeleteComponent} from "../../confirmation-delete/confirmation-delete.component";


@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.less'],
})


export class ListeComponent  {

  readonly columns = ['nom','type','etat','adresseIp','port','url','createdAt', 'actions'];

    search = '';

  applications: readonly Application[] = [

  ];


  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    @Inject(Injector) private readonly injector: Injector,
    private applicationService : ApplicationService
  ){}

  ngOnInit(): void {
    this.query()
  }

  query(): void {
    this.applicationService.query()
    .subscribe(
      (res) => {
        this.applications = res.body ?? [];
        this.alerts
            .open(`Vous avez ${this.applications.length} apllications`).subscribe()
      },
      (err)=>{

      }
      )
  }

  showDialog(application: Application): void {

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
          this.deleteApplicationById(application);

        }
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });

  }

  private deleteApplicationById(application: Application) {
    this.applicationService.delete(application.id!)
      .subscribe(
        () => {
          this.query();
        },
        (err) => {
          this.alerts.open(`Une erreur s'est produite lors de la suppression de l'application << ${application.nom} >>`);

        }
      );
    this.alerts.open(`L'application << ${application.nom} >> a été supprimé avec succès`,{
      status: 'success'
    }).subscribe();
  }

}
