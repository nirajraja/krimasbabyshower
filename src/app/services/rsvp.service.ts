import { HttpClientModule } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { of } from 'rxjs';
import { RsvpInfo } from '../components/rsvp/rsvp-form/rsvp-form.component';

@Injectable({
  providedIn: 'root'
})
export class RsvpService {
@Output()
disableRsvpButttonEvent: EventEmitter<any> = new EventEmitter();

  constructor(private http:HttpClientModule) { }

  postRsvp(info:RsvpInfo){
    return of('Success');
  }

  disableRSVPbutton() {
    this.disableRsvpButttonEvent.next({data: true});
  }
}
