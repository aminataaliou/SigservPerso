import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import { Tags } from '../models/tags';


@Injectable({providedIn: 'root'})
export class TagsService {

  protected END_POINT = environment.api_url+"/api/tags"

  constructor(protected http: HttpClient) {}

  query(): Observable<HttpResponse<Tags[]>> {
    return this.http.get<Tags[]>(this.END_POINT,{observe: "response"});
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.END_POINT}/${id}`,{observe: "response"});
  }

  create(tags: Tags): Observable<HttpResponse<Tags>> {
    return this.http.post<Tags>(this.END_POINT,tags,{observe: "response"});
  }

  update(tags: Tags): Observable<HttpResponse<Tags>> {
    return this.http.put<Tags>(`${this.END_POINT}/${tags.id}`,tags,{observe: "response"});
  }

  findById(id: number): Observable<HttpResponse<Tags>> {
    return this.http.get<Tags>(`${this.END_POINT}/${id}`,{observe: "response"});
  }

  findTagsByServeurId(id: number): Observable<HttpResponse<Tags[]>> {
    return this.http.get<Tags[]>(`${this.END_POINT}/tags-serveur/${id}`,{observe: "response"});
  }
  findTagsByApplicationId(id: number): Observable<HttpResponse<Tags[]>> {
    return this.http.get<Tags[]>(`${this.END_POINT}/tags-application/${id}`,{observe: "response"});
  }
}
