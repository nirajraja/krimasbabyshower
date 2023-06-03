import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MockTableData } from './MockTableData';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  loggedin: boolean = false;
  displayedColumns: string[] = ['Id', 'Name', 'Phone', 'GuestCount', 'Timezone', 'RSVPDATE', 'PartOfCount'];
  dataSource = new MatTableDataSource(MockTableData);
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
          this.loggedin = true;
        }
      },
      error: (e) => {
        console.log('DashboardComponent validateInfo error', e);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
