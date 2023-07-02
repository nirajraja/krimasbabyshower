import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { interval, takeWhile } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'npate-test-appui';

  constructor(private ds: DashboardService) { };

  ngOnInit(): void {
    interval(240000).subscribe(() => {
      this.pingBackEnd();
    });
  }

  pingBackEnd() {
    this.ds.getAllRsvp().subscribe({
      next: (d) => {
        console.log('pinged');
      },
      error: (d) => {
        console.log(d);
      }
    })
  }

}
