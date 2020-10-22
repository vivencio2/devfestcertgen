import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncryptionService } from '../app.service';
import { AttendeeService } from '../attendee.service';

@Component({
  selector: 'gdgph-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent {
  encTicketNumber: string = this.route.snapshot.params.cert;
  encFirstName: string = this.route.snapshot.params.attf;
  encLastName: string = this.route.snapshot.params.attl;
  attendeeFirstName: string;
  attendeeLastName: string;
  attendeeTicket: string;
  constructor(private encryptionService: EncryptionService, private attendeeService: AttendeeService, private route: ActivatedRoute) {     
    this.attendeeTicket = this.encryptionService.base64Decode(decodeURIComponent(this.encTicketNumber));
    this.attendeeFirstName = this.encryptionService.base64Decode(decodeURIComponent(this.encFirstName));
    this.attendeeLastName = this.encryptionService.base64Decode(decodeURIComponent(this.encLastName));
  }
  download() {
    this.attendeeService.generateCertificate(this.attendeeTicket, this.attendeeFirstName, this.attendeeLastName);
  }
}
