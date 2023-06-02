import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MockTableData } from './MockTableData';

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


  login() {
    let un: string | null | undefined = this.contactForm.get('userName')?.value;
    let pwd: string | null | undefined = this.contactForm.get('password')?.value;

    if (un == "hello" && pwd == "all") {
      this.loggedin = true;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
