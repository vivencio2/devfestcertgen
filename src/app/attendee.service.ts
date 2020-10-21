import { Injectable } from '@angular/core';
import master from '../app/master.json';
@Injectable({
    providedIn: 'root'
  })
export class AttendeeService {
    constructor() {}
    filter(ticketNumber: string) {
        return master.filter(attendee => {
          return attendee['ticketNumber'] == ticketNumber;
        });
      }
}