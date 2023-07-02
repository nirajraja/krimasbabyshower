import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MockTableData } from './MockTableData';
import { DashboardService } from 'src/app/services/dashboard.service';
import { RsvpDto } from './RsvpDto';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  trueCount: boolean = true;
  count!: number;
  guestCount: number = 0;
  loggedin: boolean = false;
  displayedColumns: string[] = ['Id', 'Name', 'Phone', 'GuestCount', 'Timezone', 'RSVPDATE', 'PartOfCount'];
  dataSource: any = new MatTableDataSource();
  rsvpRef!: RsvpDto[];
  contactForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private ds: DashboardService) { }

  login() {
    let un: any = this.contactForm.controls.userName.value;
    let pwd: any = this.contactForm.get('password')?.value;


    let encodeUn: string = btoa(un);
    let encodePw: string = btoa(pwd);

    console.log('DashboardComponent login un/pw: ' + un + ' / ' + pwd);
    console.log('DashboardComponent login encodeUn/encodePw: ' + encodeUn + ' / ' + encodePw);

    this.ds.validateInfo(encodeUn, encodePw).subscribe({
      next: (data: any) => {
        console.log('DashboardComponent validateInfo success', data);
        if (data['valid'] == true) {
          this.getAllrsvp();
        }
      },
      error: (e) => {
        console.log('DashboardComponent validateInfo error', e);
      }
    })
  }

  getAllrsvp() {
    this.guestCount = 0;
    this.ds.getAllRsvp().subscribe({
      next: (recs) => {
        this.rsvpRef = recs as RsvpDto[];
        this.dataSource = new MatTableDataSource(this.rsvpRef);
        this.count = this.rsvpRef.length;
        this.loggedin = true;
        this.countTotalGuests();
      },
      error: (e) => {
        console.log('DashboardComponent getAllRsvp error', e);
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  radioButtonValueChange(event: MatRadioChange) {
    console.log('DashboardComponent radioButtonValueChange ', event);
    if (event.value == 'true') {
      console.log('DashboardComponent radioButtonValueChange if ', this.rsvpRef);
      let onlyValidRSvps: RsvpDto[] = [];
      this.rsvpRef.forEach((rsvp) => {
        if (rsvp.includeRsvpInCountList) {
          onlyValidRSvps.push(rsvp);
        }
      });
      this.count = onlyValidRSvps.length;
      this.dataSource = new MatTableDataSource(onlyValidRSvps);
    } else {
      console.log('DashboardComponent radioButtonValueChange else ', this.rsvpRef);
      this.count = this.rsvpRef.length;
      this.dataSource = new MatTableDataSource();
      this.dataSource = new MatTableDataSource(this.rsvpRef);
    }
  }

  countTotalGuests() {
    this.rsvpRef.forEach((rsvp) => {
      if (rsvp.includeRsvpInCountList == true) {
        this.guestCount = this.guestCount + rsvp.guestCount;
      }
    })
  }
}
