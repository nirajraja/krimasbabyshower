import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RsvpService } from 'src/app/services/rsvp.service';
import { RsvpFormComponent } from './rsvp-form/rsvp-form.component';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent {

  disableRsvp:boolean = false;
  constructor(public dialog: MatDialog, private rsvpService:RsvpService) {
    this.rsvpService.disableRsvpButttonEvent.subscribe({
      next: (n: boolean)=>{
        this.disableRsvp = n;
      }
    })
  }

  openRsvpDialog() {
    let dialogRef = this.dialog.open(RsvpFormComponent, {
      height: '550px',
      width: '250px',
    });
  }
}
