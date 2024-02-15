import {ChangeDetectionStrategy, Component, Inject, Injector} from '@angular/core';
import {TuiAlertService, TuiDialogService} from '@taiga-ui/core';
import { Utilisateur } from 'src/app/shareds/models/utilisateur';
import { UtilisateurService } from 'src/app/shareds/services/utilisateur.service';
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {ConfirmationDeleteComponent} from "../../confirmation-delete/confirmation-delete.component";


@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.less'],
})
export class ListeComponent {
  readonly columns = ['nom', 'prenom', 'email','profil','createdAt', 'actions'];
  utilisateurs: readonly Utilisateur[] = [];
    search = '';


  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private utilisateurService:UtilisateurService
  ){}

  ngOnInit(): void {
    this.query()
  }

  query(): void {
    this.utilisateurService.query()
    .subscribe(
      (res) => {
        this.utilisateurs = res.body ?? [];
      },
      (err)=>{

      }
      )
  }

  showDialog(utilisateur: Utilisateur): void {

    this.dialogs.open<string>(
      new PolymorpheusComponent(ConfirmationDeleteComponent, this.injector),
      {
        data: 237,
        dismissible: true,
        label: 'Demande de confirmation',
        closeable: true,
      })
      .subscribe({
      next: (data) => {
        if(data === 'OK'){
          this.deleteUtilisateurById(utilisateur);

        }
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });

  }

 deleteUtilisateurById(utilisateur: Utilisateur) {
   console.log(utilisateur)
   this.utilisateurService.delete(utilisateur.id!)
     .subscribe(
       () => {
         this.query();
         this.alerts.open(`L'utilisateur << ${utilisateur.nom} >> a été supprimé avec succès`, {
           status: 'success'
         }).subscribe()
       },
       (err) => {
         console.log(err);
         this.alerts.open(`Une erreur s'est produite lors de la suppression de l'utilisateur << ${utilisateur.nom} >>`);

       }
     );
  }
}
