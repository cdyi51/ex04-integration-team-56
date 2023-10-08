import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from './user';
import { Checkin } from './checkin';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {
  constructor(private http: HttpClient) { }

  checkinStudent(pid: string): Observable<Checkin>{

    return this.http.post<Checkin>("/api/checkin",{pid});
  }
}
