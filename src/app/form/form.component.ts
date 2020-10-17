import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from '../app.service';
import { AttendeeService } from '../attendee.service';

@Component({
  selector: 'gdgph-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent {
  form: FormGroup;
  validTicket: boolean = true;

  constructor(private router: Router, private encryptionService: EncryptionService, private builder: FormBuilder, private attendeeService: AttendeeService) { 
    this.form = this.builder.group({
      'emailAddress': [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'ticketNumber': [null, Validators.required]
    })
  }

  proceed(): void {
    this.touched(this.form);
    this.validTicketNumber(this.form.controls["ticketNumber"].value);
    if(this.form.valid && !!this.validTicket) {
      var key = this.encryptionService.encrypt(this.form.controls["ticketNumber"].value);
    this.router.navigate(['/certificate/'+ encodeURIComponent(key)]);
    }
  }

  touched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.touched(control); }
      else { control.markAsTouched(); };
    });
  };

  validTicketNumber(ticketNumber: string) {
    var attendee = this.attendeeService.filter(ticketNumber);
    if (attendee == undefined || attendee == null || attendee.length == 0) {
      this.validTicket = false;
    } else {
      this.validTicket = true;
    }
  }
}
