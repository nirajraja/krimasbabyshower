import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { of } from 'rxjs';
import { RsvpInfo } from '../components/rsvp/rsvp-form/rsvp-form.component';

@Injectable({
  providedIn: 'root'
})
export class RsvpService {
  @Output()
  disableRsvpButttonEvent: EventEmitter<any> = new EventEmitter();

  serviceUrl: string = 'https://npate-heroku-ui-service.herokuapp.com/api/v1/';
  //serviceUrl: string = '/api/v1/';
  constructor(private http: HttpClient) { }

  postRsvp(info: RsvpInfo) {
    return this.http.post<any>(this.serviceUrl + 'addrsvp', info);
    //return of('Success');
  }

  disableRSVPbutton() {

    console.log('RsvpService disableRSVPbutton n: ', true);
    this.disableRsvpButttonEvent.next({ data: true });
  }
}
