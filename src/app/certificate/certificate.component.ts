import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncryptionService } from '../app.service';
import { AttendeeService } from '../attendee.service';
import {jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
  download() {
    var element = document.getElementById('certificate');
    html2canvas(element).then((canvas) => {
      console.log(canvas);
      var screen = canvas.toDataURL('image/png');
      var doc = new jsPDF();
      var height = canvas.height * 208 / canvas.width;
      doc.addImage(screen, 0, 0, 208, height);
      doc.save("DevFestPH2020Certificate.pdf");
    });
  }
}
