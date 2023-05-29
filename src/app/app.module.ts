import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RsvpFormComponent } from './components/rsvp/rsvp-form/rsvp-form.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    RsvpComponent,
    RsvpFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, MatButtonModule, BrowserAnimationsModule, MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
