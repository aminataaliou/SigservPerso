import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Authentification} from "../models/authentification";
import {Observable} from "rxjs";


@Injectable({providedIn: 'root'})

export class AuthentificationService {

  protected END_POINT = environment.api_url + "/api/authenticate"

  constructor(protected http: HttpClient) {
  }

  authenticateAndGetToken(authentification: Authentification):Observable<HttpResponse<any>> {
    return this.http.post<any>(this.END_POINT, authentification, {observe: "response"});
  }
}
