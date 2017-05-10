import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {PatientService} from './services/patient.service';
import {RoomService} from './services/room.service';
import {DoctorService} from './services/doctor.service';
import {MachineService} from './services/machine.service';
import {ConsultationService} from './services/consultation.service';
import {ImageService} from './services/image.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
      PatientService,
      RoomService,
      DoctorService,
      MachineService,
      ConsultationService,
      ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
