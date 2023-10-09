import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import {map, tap} from 'rxjs/operators'
import { User } from './user';
import { Checkin } from './checkin';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  public checkins$: Observable<Checkin[]>

  constructor(private http: HttpClient) { 
    this.checkins$ =  this.http.get<Checkin[]>("/api/checkinList");
  }

  checkinStudent(pid: string): Observable<Checkin>{
    return this.http.post<Checkin>("/api/checkin",{pid});
  }

  getCheckins(): Observable<Checkin[]> {
    const datePipe = new DatePipe('en-US');

    return this.checkins$.pipe(
      map(checkinArray => 
        {
          for (var checkin of checkinArray){
            checkin.created_at = datePipe.transform(new Date(checkin.created_at), 'yyyy/MM/dd @ hh:mma')!;
          }
          return checkinArray;
        }

      )
      // , 
      // tap(transformedCheckins => {
      //   console.log("Transformed Checkins:", transformedCheckins);
      // })
    );
  }
}
