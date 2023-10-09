import { Component } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import { CheckinService } from '../checkin.service';
import { User } from '../user';
import { Checkin } from '../checkin';

@Component({
  selector: 'app-checkin-page',
  templateUrl: './checkin-page.component.html',
  styleUrls: ['./checkin-page.component.css']
})
export class CheckinPageComponent {
  checkinForm = this.formBuilder.group({
    pid:'',
  })
    

  constructor(private formBuilder: FormBuilder, private checkinService: CheckinService){}


  onSubmit(): void{
    console.log("Checkin form submitted")
    if(this.checkinForm.value.pid!.toString().length !=9){
      console.log("Invalid PID")
      window.alert("Bad PID, please retry.")
    }
    else{
      //Run check in service
      this.checkinService.checkinStudent(this.checkinForm.value.pid!).subscribe({
        next: (checkin_request) => this.onSuccess(checkin_request),
        error: (err) => this.onError(err)
      });
    
    }
  }

  private onSuccess(checkin: Checkin){
    console.log(checkin.user)
    //If pid found
    let regMessage = 'Thank you, ' + checkin.user.first_name + ' ' + checkin.user.last_name+ ' has been checked in.' 
    window.alert(regMessage);
    this.checkinForm.reset();
  }
  private onError(err: Error){
    //If pid not found
    window.alert("PID could not be found.");
  }
}
