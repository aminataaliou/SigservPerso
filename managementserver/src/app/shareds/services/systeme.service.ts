import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import { Systeme } from '../models/systeme';


@Injectable({providedIn: 'root'})
export class SystemeService {

  protected END_POINT = environment.api_url+"/api/systemes"

  constructor(protected http: HttpClient) {}

  query(): Observable<HttpResponse<Systeme[]>> {
    return this.http.get<Systeme[]>(this.END_POINT,{observe: "response"});
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.END_POINT}/${id}`,{observe: "response"});
  }

  create(systeme: Systeme): Observable<HttpResponse<Systeme>> {
    return this.http.post<Systeme>(this.END_POINT,systeme,{observe: "response"});
  }

  update(systeme: Systeme): Observable<HttpResponse<Systeme>> {
    return this.http.put<Systeme>(`${this.END_POINT}/${systeme.id}`,systeme,{observe: "response"});
  }

  findById(id: number): Observable<HttpResponse<Systeme>> {
    return this.http.get<Systeme>(`${this.END_POINT}/${id}`,{observe: "response"});
  }
}
