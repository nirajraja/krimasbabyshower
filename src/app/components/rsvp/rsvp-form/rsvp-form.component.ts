import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

interface DdValue {
  value: string;
  label: string;
}

interface RsvpInfo {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  phone: string | null | undefined;
  attendeeCount: string | null | undefined;
}

@Component({
  selector: 'app-rsvp-form',
  templateUrl: './rsvp-form.component.html',
  styleUrls: ['./rsvp-form.component.css'],
})
export class RsvpFormComponent {

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

  constructor(public dialog: MatDialog) { }

  submitRsvp() {
    this.contactForm.markAllAsTouched();
    console.log('RsvpFormComponent this.contactForm.pristine: ', this.contactForm.pristine);
    if (this.contactForm.invalid) {
      this.invalidForm = true;
    } else if (this.contactForm.valid) {
      console.log('RsvpFormComponent ravp info: ', this.getRsvpInfo());
    }
  }

  getRsvpInfo() {
    let rsvp: RsvpInfo = {
      firstName: this.contactForm.get('firstname')?.value,
      lastName: this.contactForm.get('lastname')?.value,
      phone: this.contactForm.get('phoneNumber')?.value,
      attendeeCount: this.contactForm.get('peopleCount')?.value,
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
