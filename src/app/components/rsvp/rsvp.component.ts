import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RsvpService } from 'src/app/services/rsvp.service';
import { RsvpFormComponent } from './rsvp-form/rsvp-form.component';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent implements OnInit {
  allowedRsvpRegion: string[] = ['AMERICA'];
  disableRsvp: boolean = false;
  rsvpDatePassed: boolean = false;
  hideRsvpButtonForExternalRegion: boolean = false;
  constructor(public dialog: MatDialog, private rsvpService: RsvpService) {
  }
  ngOnInit(): void {
    this.rsvpService.disableRsvpButttonEvent.subscribe({
      next: (n: boolean) => {
        console.log('RsvpComponent rsvp n: ', n);
        this.disableRsvp = n;
      }
    });
    let timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('RsvpComponent rsvp timezone: ', timezone);
    let continent: string = timezone.split('/')[0];
    console.log('RsvpComponent rsvp timezone: ', continent);
    this.hideRsvpButtonForExternalRegion = this.allowedRsvpRegion.includes(continent.toUpperCase()) ? true : false;
    let d = new Date();
    var g1 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    // (YYYY, MM, DD) 
    var g2 = new Date(2023, 7, 25);
    console.log("g1", g1);
    console.log("g2", g2);
    if (g1.getTime() < g2.getTime()) {
      console.log("g1 is lesser than g2");
    }
    else if (g1.getTime() > g2.getTime()) {
      console.log("g1 is greater than g2");
      this.rsvpDatePassed = true;
    }
    else {
      this.rsvpDatePassed = true;
      console.log("both are equal");
    }
  }

  openRsvpDialog() {
    let dialogRef = this.dialog.open(RsvpFormComponent, {
      height: '550px',
      width: '250px',
    });
  }
}
