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
    if(this.form.valid) {
      this.validTicketNumber(this.form.controls["ticketNumber"].value);
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
    this.attendeeService.validateAttendee(ticketNumber).subscribe(result => {
      if(result !== undefined) {
        this.validTicket = result.isValid;
        var firstName = this.encryptionService.base64Encode(result.firstName);
        var lastName = this.encryptionService.base64Encode(result.lastName);
        var cert = this.encryptionService.base64Encode(this.form.controls["ticketNumber"].value);
        this.router.navigate(['/certificate/'+ encodeURIComponent(cert) + '/' + encodeURIComponent(firstName) + '/' + encodeURIComponent(lastName)]);
      }
    });
  }
}
