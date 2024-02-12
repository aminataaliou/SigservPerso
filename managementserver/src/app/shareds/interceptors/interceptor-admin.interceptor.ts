import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from "rxjs";
import {AuthentificationService} from "../services/authentification.service";
import {AdminGuardService} from "../services/admin.guard";

@Injectable()
export class InterceptorAdminInterceptor implements HttpInterceptor {

  constructor(private authentificationService:AuthentificationService,
              private adminGuardService:AdminGuardService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('authenticationToken');
    if(token!==null){
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      request = request.clone({
        setHeaders: headers
      });
    }


    return next.handle(request);
  }
}
