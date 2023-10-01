import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { User } from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  form = this.formBuilder.group({
    pid: '',
    first_name: '',
    last_name: ''
  });

  constructor(
    private registrationService: RegistrationService,
    private formBuilder: FormBuilder,
  ) {}

  onSubmit(): void {
    let form = this.form.value;
    let pid = parseInt(form.pid ?? "");
    let first_name = form.first_name ?? "";
    let last_name = form.last_name ?? "";

    this.registrationService
      .registerUser(pid, first_name, last_name)
      .subscribe({
        next: (user) => this.onSuccess(user),
        error: (err) => this.onError(err)
      });
  }

  private onSuccess(user: User): void {
    window.alert(`Thanks for registering: ${user.first_name} ${user.last_name}`);
    this.form.reset();
  }

  private onError(err: Error) {
    if (err.message) {
      window.alert(err.message);
    } else {
      window.alert("Unknown error: " + JSON.stringify(err));
    }
  }

}