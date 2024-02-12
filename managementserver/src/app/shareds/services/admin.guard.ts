import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  constructor(
    private router:Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean
    |Promise<boolean> |Observable <boolean>  {
    if (localStorage.getItem('authenticationToken') !== null){
      return true;
    }else{
      this.router.navigateByUrl('/').then();
      return false;
    }
  }

}
