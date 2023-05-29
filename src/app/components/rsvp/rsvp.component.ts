import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RsvpFormComponent } from './rsvp-form/rsvp-form.component';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent {

  constructor(public dialog: MatDialog) { }

  openRsvpDialog() {
    let dialogRef = this.dialog.open(RsvpFormComponent, {
      height: '800px',
      width: '500px',
    });
  }
}
