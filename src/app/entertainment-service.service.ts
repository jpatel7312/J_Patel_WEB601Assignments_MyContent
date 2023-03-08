import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Content } from '../helper-files/content-interface';
import { contentList } from '../helper-files/contentDb';

@Injectable({
  providedIn: 'root'
})
export class EntertainmentServiceService {

  constructor() { }

  getContent(): Observable<Content[]>{
    if (!contentList.contentListArr.length) {
      contentList.generateContent();
    }
    return of(contentList.contentListArr);
  }

  getContentAtId(id:number|null): Observable<Content>{
    const idToUse:number = id?id:0;
    return of(contentList.getSpecificContent(idToUse));
  }
}
