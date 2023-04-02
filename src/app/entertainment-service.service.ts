import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Content } from '../helper-files/content-interface';

@Injectable({
  providedIn: 'root'
})
export class EntertainmentServiceService {

  conentUrl = 'api/content/';
  sharedContent:Content[] = [];
  constructor(private http:HttpClient) { }

  getContent(): Observable<Content[]>{
    return this.http.get<Content[]>(this.conentUrl);
  }

  getContentAtId(id:number|null): Observable<Content>{
    return this.http.get<Content>(this.conentUrl + id);
  }

  postContent(content: Content): Observable<Content>{
    return this.http.post<Content>(this.conentUrl, content).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  putContent(content: Content): Observable<Content>{
    return this.http.put<Content>(this.conentUrl + content.id, content);
  }
}
