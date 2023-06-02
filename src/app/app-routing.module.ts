import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';

const routes: Routes = [
  { path: '', redirectTo: '/rsvp', pathMatch: 'full' },
  { path: 'rsvp', component: RsvpComponent },
  { path: 'dash', component: DashboardComponent },
  // { path: '**', redirectTo: '/rsvp', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
