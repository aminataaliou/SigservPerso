import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import { Emplacement } from '../models/emplacement';
import {Application} from "../models/application";
import {Datacenter} from "../models/datacenter";


@Injectable({providedIn: 'root'})
export class EmplacementService {

  protected END_POINT = environment.api_url+"/api/emplacements"

  constructor(protected http: HttpClient) {}

  query(): Observable<HttpResponse<Emplacement[]>> {
    return this.http.get<Emplacement[]>(this.END_POINT,{observe: "response"});
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.END_POINT}/${id}`,{observe: "response"});
  }

  create(emplacement: Emplacement): Observable<HttpResponse<Emplacement>> {
    return this.http.post<Emplacement>(this.END_POINT,emplacement,{observe: "response"});
  }

  update(emplacement: Emplacement): Observable<HttpResponse<Emplacement>> {
    return this.http.put<Emplacement>(`${this.END_POINT}/${emplacement.id}`,emplacement,{observe: "response"});
  }

  findById(id: number): Observable<HttpResponse<Emplacement>> {
    return this.http.get<Emplacement>(`${this.END_POINT}/${id}`,{observe: "response"});
  }

  findEmplacementByDatacenterId(id: number): Observable<HttpResponse<Emplacement[]>> {
    return this.http.get<Emplacement[]>(`${this.END_POINT}/emplacements-data-center/${id}`,{observe: "response"});
  }

}
