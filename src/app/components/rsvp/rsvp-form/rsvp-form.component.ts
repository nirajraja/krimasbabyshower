import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RsvpService } from 'src/app/services/rsvp.service';

interface DdValue {
  value: string;
  label: string;
}

export interface RsvpInfo {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  phone: string | null | undefined;
  guestCount: string | null | undefined;
  timezone: string | null | undefined;
  locationContinent: string | null | undefined;
  includeRsvpInCountList: boolean | null | undefined;
}

@Component({
  selector: 'app-rsvp-form',
  templateUrl: './rsvp-form.component.html',
  styleUrls: ['./rsvp-form.component.css'],
})
export class RsvpFormComponent {
  showSpinner: boolean = false;
  invalidForm: boolean = false;
  contactForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    peopleCount: new FormControl('', [Validators.required])
  })

  attendees: DdValue[] = [{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' },
  { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6', label: '6' }, { value: '7', label: '7' },
  { value: '8', label: '8' }, { value: '9', label: '9' }, { value: '10', label: '10' }];

  allowedRsvpRegion: string[] = ['AMERICA'];

  constructor(public dialog: MatDialog, private rsvpServce: RsvpService) { }

  submitRsvp() {
    this.contactForm.markAllAsTouched();
    console.log('RsvpFormComponent this.contactForm.pristine: ', this.contactForm.pristine);
    if (this.contactForm.invalid) {
      this.invalidForm = true;
    } else if (this.contactForm.valid) {
      this.showSpinner = true;
      console.log('RsvpFormComponent rsvp info: ', this.getRsvpInfo());
      this.rsvpServce.postRsvp(this.getRsvpInfo()).subscribe({
        next: (data) => {
          console.log('RsvpFormComponent rsvp success', data);
          this.rsvpServce.disableRSVPbutton();
          if (data['status'] == 'Saved') {
            this.dialog.closeAll();
          }
        },
        error: (e) => { console.error('RsvpFormComponent rsvp error', e) },
      })
    }
  }

  getRsvpInfo() {
    let timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('RsvpFormComponent rsvp timezone: ', timezone);
    let continent: string = timezone.split('/')[0];
    console.log('RsvpFormComponent rsvp timezone: ', continent);
    let rsvp: RsvpInfo = {
      firstName: this.contactForm.get('firstname')?.value,
      lastName: this.contactForm.get('lastname')?.value,
      phone: this.contactForm.get('phoneNumber')?.value,
      guestCount: this.contactForm.get('peopleCount')?.value,
      locationContinent: continent,
      includeRsvpInCountList: this.allowedRsvpRegion.includes(continent.toUpperCase()) ? true : false,
      timezone: timezone
    }
    return rsvp;
  }
  cancel() {
    if (!this.contactForm.pristine) {
      if (confirm('Warning!!!If you navigate away from this form, all the entered information will be lost. Please confirm.')) {
        this.dialog.closeAll();
      }
    } else {
      this.dialog.closeAll();
    }
  }
}
