import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {Serveur} from "../models/serveur";
import {environment} from "../../../environments/environment";
import {Application} from "../models/application";


@Injectable({providedIn: 'root'})
export class ServeurService {

  protected END_POINT = environment.api_url+"/api/serveurs"

  constructor(protected http: HttpClient) {}

  query(): Observable<HttpResponse<Serveur[]>> {
    return this.http.get<Serveur[]>(this.END_POINT,{observe: "response"});
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.END_POINT}/${id}`,{observe: "response"});
  }

  create(serveur: Serveur): Observable<HttpResponse<Serveur>> {
    return this.http.post<Serveur>(this.END_POINT,serveur,{observe: "response"});
  }

  update(serveur: Serveur): Observable<HttpResponse<Serveur>> {
    return this.http.put<Serveur>(`${this.END_POINT}/${serveur.id}`,serveur,{observe: "response"});
  }

  findById(id: number): Observable<HttpResponse<Serveur>> {
    return this.http.get<Serveur>(`${this.END_POINT}/${id}`,{observe: "response"});
  }

  save(serveur:Serveur): Observable<HttpResponse<Serveur>>{
    return this.http.put<Serveur>(`${this.END_POINT}/${serveur.id}`,serveur,{observe: "response"});
  }

  addApplicationsToServerById(serveur:Serveur,applications:Application[]): Observable<HttpResponse<Serveur>>{
    return this.http.post<Serveur>(`${this.END_POINT}/add-application/${serveur.id}`,applications,{observe: "response"});
  }

  addServeursToServerById(serveur:Serveur,serveurs:Serveur[]): Observable<HttpResponse<Serveur>>{
    return this.http.post<Serveur>(`${this.END_POINT}/add-serveurs/${serveur.id}`,serveurs,{observe: "response"});
  }

  findServeurVirtuelByServeurId(id: number): Observable<HttpResponse<Serveur[]>> {
    return this.http.get<Serveur[]>(`${this.END_POINT}/serveurs-serveur-virtuel/${id}`,{observe: "response"});
  }

  findServeurByApplicationId(id: number): Observable<HttpResponse<Serveur[]>> {
    return this.http.get<Serveur[]>(`${this.END_POINT}/serveurs-application/${id}`,{observe: "response"});
  }
  findServeurBySystemeId(id: number): Observable<HttpResponse<Serveur[]>> {
    return this.http.get<Serveur[]>(`${this.END_POINT}/serveurs-systeme/${id}`,{observe: "response"});
  }
  findServeurByEmplacementId(id: number): Observable<HttpResponse<Serveur[]>> {
    return this.http.get<Serveur[]>(`${this.END_POINT}/serveurs-emplacement/${id}`,{observe: "response"});
  }
  findServeurByCompteId(id: number): Observable<HttpResponse<Serveur[]>> {
    return this.http.get<Serveur[]>(`${this.END_POINT}/serveurs-compte-acces/${id}`,{observe: "response"});
  }
}
