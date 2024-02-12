import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import { Datacenter } from '../models/datacenter';
import {Serveur} from "../models/serveur";
import {Application} from "../models/application";
import {Emplacement} from "../models/emplacement";


@Injectable({providedIn: 'root'})
export class DatacenterService {

  protected END_POINT = environment.api_url+"/api/data-centers"

  constructor(protected http: HttpClient) {}

  query(): Observable<HttpResponse<Datacenter[]>> {
    return this.http.get<Datacenter[]>(this.END_POINT,{observe: "response"});
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.END_POINT}/${id}`,{observe: "response"});
  }

  create(datacenter: Datacenter): Observable<HttpResponse<Datacenter>> {
    return this.http.post<Datacenter>(this.END_POINT,datacenter,{observe: "response"});
  }

  update(datacenter: Datacenter): Observable<HttpResponse<Datacenter>> {
    return this.http.put<Datacenter>(`${this.END_POINT}`,datacenter,{observe: "response"});
  }

  findById(id: number): Observable<HttpResponse<Datacenter>> {
    return this.http.get<Datacenter>(`${this.END_POINT}/${id}`,{observe: "response"});
  }

  addEmplacementsToDatacenterById(datacenter:Datacenter,emplacements:Emplacement[]): Observable<HttpResponse<Datacenter>>{
    return this.http.post<Datacenter>(`${this.END_POINT}/add-emplacement/${datacenter.id}`,emplacements,{observe: "response"});
  }
}
