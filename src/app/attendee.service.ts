import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import master from '../app/master.json';
@Injectable({
    providedIn: 'root'
  })
export class AttendeeService {
  
    constructor(private http: HttpClient) {}
    filter(ticketNumber: string) {
        return master.filter(attendee => {
          return attendee['ticketNumber'] == ticketNumber;
        });
      }
    
    validateAttendee(ticketNumber: string): Observable<any> {
      const url = `${environment.apiUrl}/gdgph/${ticketNumber}`;
      return this.http.get(url);
    }

    generateCertificate(ticketNumber: string, firstName: string, lastName: string): void {
      const url = `${environment.apiUrl}/gdgph/${ticketNumber}/${firstName}/${lastName}`;
      this.http.get(url, {
        responseType: 'blob'
      }).subscribe((blob: Blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'GDGPH2020Certificate.pdf';
        document.body.appendChild(link);
        link.click();
      });
    }

    updateAttendee(ticketNumber: string, firstName: string, lastName: string):void {
      const url = `${environment.apiUrl}/gdgph/${ticketNumber}`;
      this.http.put(url,  { 'firstName': firstName, 'lastName': lastName }).subscribe(success => {
        console.log('success');
      });
    }
}