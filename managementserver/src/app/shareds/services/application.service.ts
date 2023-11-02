import { Injectable } from '@angular/core';
import {HttpClient,HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import { Application } from '../models/application';
import {Serveur} from "../models/serveur";


@Injectable({providedIn: 'root'})
export class ApplicationService {

  protected END_POINT = environment.api_url + "/api/applications"

  constructor(protected http: HttpClient) {
  }

  query(): Observable<HttpResponse<Application[]>>{
    return this.http.get<Application[]>(this.END_POINT,{observe: "response"});
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.END_POINT}/${id}`,{observe: "response"});
  }

  create (application: Application): Observable<HttpResponse<Application>> {
    return this.http.post<Application>(this.END_POINT,application,{observe: "response"});
  }

  update (application: Application): Observable<HttpResponse<Application>>{
    return this.http.put<Application>(`${this.END_POINT}/${application.id}`,application,{observe: "response"});
  }

  findById( id:number) : Observable<HttpResponse<Application>>{
    return this.http.get<Application>(`${this.END_POINT}/${id}`,{observe: "response"});
  }

  findApplicationByServeurId(id: number): Observable<HttpResponse<Application[]>> {
    return this.http.get<Application[]>(`${this.END_POINT}/applications-serveur/${id}`,{observe: "response"});
  }
  addServeursToApplicationById(application:Application,serveurs:Serveur[]): Observable<HttpResponse<Application>>{
    return this.http.post<Application>(`${this.END_POINT}/add-serveur/${application.id}`,serveurs,{observe: "response"});
  }
}


