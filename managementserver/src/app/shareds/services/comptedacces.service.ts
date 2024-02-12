import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {Serveur} from "../models/serveur";
import {environment} from "../../../environments/environment";
import { Comptedacces } from '../models/comptedacces';
import {Application} from "../models/application";
import {Tags} from "../models/tags";


@Injectable({providedIn: 'root'})
export class ComptedaccesService {

  protected END_POINT = environment.api_url+"/api/compte-acces"

  constructor(protected http: HttpClient) {}

  query(): Observable<HttpResponse<Comptedacces[]>> {
    return this.http.get<Comptedacces[]>(this.END_POINT,{observe: "response"});
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.END_POINT}/${id}`,{observe: "response"});
  }

  create(comptedacces: Comptedacces): Observable<HttpResponse<Comptedacces>> {
    return this.http.post<Comptedacces>(this.END_POINT,comptedacces,{observe: "response"});
  }

  update(comptedacces: Comptedacces): Observable<HttpResponse<Comptedacces>> {
    return this.http.put<Comptedacces>(`${this.END_POINT}`,comptedacces,{observe: "response"});
  }

  findById(id: number): Observable<HttpResponse<Comptedacces>> {
    return this.http.get<Comptedacces>(`${this.END_POINT}/${id}`,{observe: "response"});
  }

  findComptedaccesByServeurId(id: number): Observable<HttpResponse<Comptedacces[]>> {
    return this.http.get<Comptedacces[]>(`${this.END_POINT}/compte-acces-serveurs/${id}`,{observe: "response"});
  }

  addServeursToComptedaccesById(comptedacces:Comptedacces,serveurs:Serveur[]): Observable<HttpResponse<Comptedacces>>{
    return this.http.post<Comptedacces>(`${this.END_POINT}/add-serveur/${comptedacces.id}`,serveurs,{observe: "response"});
  }
}
