import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncryptionService } from '../app.service';
import { AttendeeService } from '../attendee.service';

@Component({
  selector: 'gdgph-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent {
  encTicketNumber: string = this.route.snapshot.params.key;
  attendeeName: string;
  constructor(private encryptionService: EncryptionService, private attendeeService: AttendeeService, private route: ActivatedRoute) { 
    console.log()
    var attendee = this.attendeeService.filter(this.encryptionService.decrypt(decodeURIComponent(this.encTicketNumber)));
    this.attendeeName = attendee[0].fullName;
  }
}
