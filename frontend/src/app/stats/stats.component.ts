import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationService } from '../registration.service';
import { User } from '../user';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {

  public users$: Observable<User[]>;

  constructor(registrationService: RegistrationService) {
    this.users$ = registrationService.getUsers();
  }

}