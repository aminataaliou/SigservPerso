import {Component, Inject, TemplateRef} from '@angular/core';
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-confirmation-delete',
  templateUrl: './confirmation-delete.component.html',
  styleUrls: ['./confirmation-delete.component.less']
})
export class ConfirmationDeleteComponent {
  value: number | null = null;
  name = '';
  items = [10, 50, 100];

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
      private readonly context: TuiDialogContext<string, string>,
  ) {}

  get hasValue(): boolean {
    return this.value !== null;
  }

  get data(): string {
    return this.context.data;
  }

  submit(text: string): void {
    this.context.completeWith(text);
  }



  showDialog(content: TemplateRef<TuiDialogContext>): void {
    this.dialogs.open(content, {dismissible: true}).subscribe();
  }

}
