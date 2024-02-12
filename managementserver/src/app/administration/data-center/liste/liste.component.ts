import {Component, Inject, Injector, OnInit} from '@angular/core';
import {TuiAlertService, TuiDialogService} from "@taiga-ui/core";
import {DatacenterService} from "../../../shareds/services/datacenter.service";
import {Datacenter} from "../../../shareds/models/datacenter";
import {Emplacement} from "../../../shareds/models/emplacement";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {ConfirmationDeleteComponent} from "../../confirmation-delete/confirmation-delete.component";

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.less']
})
export class ListeComponent implements OnInit{

  search = '';

  readonly columns = ['nom', 'pays','ville','quartier','createdAt','actions'];
  datacenter : readonly Datacenter[]=[];


  constructor(
    private datacenterService:DatacenterService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    @Inject(Injector) private readonly injector: Injector,
  ) {}

  ngOnInit(): void {
    this.query();
  }

  query():void{
    this.datacenterService.query().subscribe(
      (res) => {
        this.datacenter = res.body ?? [];
        this.alerts
          .open(`Vous avez ${this.datacenter.length} Data-center`).subscribe()
        console.log(this.datacenter);
      },
      (err) => { }
    )
  }

  showDialog(datacenter: Datacenter): void {

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
          this.deleteDatacenterById(datacenter);

        }
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });

  }

  private deleteDatacenterById(datacenter: Datacenter) {
    this.datacenterService.delete(datacenter.id!)
      .subscribe(
        () => {
          this.query();
        },
        (err) => {
          this.alerts.open(`Une erreur s'est produite lors de la suppression du data_center << ${datacenter.nom} >>`);

        }
      );
    this.alerts.open(`le data_center << ${datacenter.nom} >> a été supprimé avec succès`,{
      status: 'success'
    }).subscribe();
  }
}
