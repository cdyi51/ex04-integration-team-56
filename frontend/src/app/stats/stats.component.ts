import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import {Checkin} from '../checkin'
import {CheckinService} from '../checkin.service'


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {

  public users$: Observable<User[]>;
  public transformedCheckins$: Observable<Checkin[]>;

  constructor(private registrationService: RegistrationService, private checkinService: CheckinService) {
    this.users$ = registrationService.getUsers();
    this.transformedCheckins$ = checkinService.getCheckins();
  }

  deleteUser(pid: number) {
    this.registrationService.deleteUser(pid);
    // re-initialize users and checkins
    this.registrationService.getUsers();
    this.checkinService.getCheckins();
  }

}