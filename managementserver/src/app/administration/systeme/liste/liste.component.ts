import {ChangeDetectionStrategy, Component, Inject, Injector} from '@angular/core';
import { TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';
import {TuiAlertService, TuiDialogService} from '@taiga-ui/core';
import { TUI_ARROW } from '@taiga-ui/kit';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Systeme } from 'src/app/shareds/models/systeme';
import { SystemeService } from 'src/app/shareds/services/systeme.service';
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {ConfirmationDeleteComponent} from "../../confirmation-delete/confirmation-delete.component";



@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListeComponent {


  readonly columns = ['nom','version','distribution', 'actions'];
  systemes: readonly Systeme[] = [];

    search = '';



  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private systemeService : SystemeService
  ){}


  ngOnInit(): void {
    this.query()
  }

  query(): void {
    this.systemeService.query()
    .subscribe(
      (res) => {
        this.systemes = res.body ?? [];
      },
      (err)=>{

      }
      )
  }

  showDialog(systeme: Systeme): void {

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
          this.deleteSystemeById(systeme);

        }
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });

  }

  private deleteSystemeById(systeme: Systeme) {
    this.systemeService.delete(systeme.id!)
      .subscribe(
        () => {
          this.query();
        },
        (err) => {
          this.alerts.open(`Une erreur s'est produite lors de la suppression du systeme <<${systeme.nom}>>`);

        }
      );
    this.alerts.open(`le systeme <<${systeme.nom}>> a été supprimé avec succès`,{
      status: 'success'
    }).subscribe();
  }
}
