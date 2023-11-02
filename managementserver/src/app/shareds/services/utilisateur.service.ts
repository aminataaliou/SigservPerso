import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import { Utilisateur } from '../models/utilisateur';


@Injectable({providedIn: 'root'})
export class UtilisateurService {

  protected END_POINT = environment.api_url+"/api/utilisateurs"

  constructor(protected http: HttpClient) {}

  query(): Observable<HttpResponse<Utilisateur[]>> {
    return this.http.get<Utilisateur[]>(this.END_POINT,{observe: "response"});
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.END_POINT}/${id}`,{observe: "response"});
  }

  create(utilisateur: Utilisateur): Observable<HttpResponse<Utilisateur>> {
    return this.http.post<Utilisateur>(this.END_POINT,utilisateur,{observe: "response"});
  }

  update(utilisateur: Utilisateur): Observable<HttpResponse<Utilisateur>> {
    return this.http.put<Utilisateur>(`${this.END_POINT}/${utilisateur.id}`,utilisateur,{observe: "response"});
  }

  findById(id: number): Observable<HttpResponse<Utilisateur>> {
    return this.http.get<Utilisateur>(`${this.END_POINT}/${id}`,{observe: "response"});
  }
}
