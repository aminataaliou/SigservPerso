import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthentificationService} from "./authentification.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private router:Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean
    |Promise<boolean> |Observable <boolean>  {
    if (localStorage.getItem('authenticationToken') === null){
      return true;
    }else{
      this.router.navigateByUrl('/admin').then();
      return false;
    }
  }

}
