import {Inject, Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {TuiAlertService, TuiDialogService} from "@taiga-ui/core";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    @Inject(Injector) private readonly injector: Injector,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler){
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.alerts.open(`${error.message} `,{status:"error"}).subscribe();
/*        if (error.status === 401 ) {
          this.alerts.open(`${error.error.message} `).subscribe();
        }*/
        return throwError(error);
      })
    );
  }
}
