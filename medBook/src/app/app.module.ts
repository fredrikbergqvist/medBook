import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {PatientService} from './shared/patient/patient.service';
import {RoomService} from './shared/room/room.service';
import {DoctorService} from './shared/doctor/doctor.service';
import {MachineService} from './shared/machine/machine.service';
import {ConsultationService} from './shared/consultation/consultation.service';
import {ImageService} from './shared/image/image.service';
import {HttpService} from './shared/services/http.service';
import {ConsultationListComponent} from './components/consultation-list/consultation-list.component';
import {PatientFactory} from './shared/patient/patient.factory';
import {ConsultationFactory} from './shared/consultation/consultation.factory';
import {DoctorFactory} from './shared/doctor/doctor.factory';
import {RoomFactory} from './shared/room/room.factory';
import { ConsultationItemComponent } from './components/consultation-item/consultation-item.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ScheduleConsultationComponent } from './components/schedule-consultation/schedule-consultation.component';
import {MedicalConditionsService} from './shared/services/medical-conditions.service';
import {SpecialistRoleService} from './shared/services/specialist-role.service';

@NgModule({
    declarations : [
        AppComponent,
        ConsultationListComponent,
        ConsultationItemComponent,
        DatePickerComponent,
        ScheduleConsultationComponent
    ],
    imports :      [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    providers :    [
        PatientService,
        PatientFactory,
        RoomService,
        RoomFactory,
        DoctorService,
        DoctorFactory,
        MachineService,
        ConsultationService,
        ConsultationFactory,
        MedicalConditionsService,
        SpecialistRoleService,
        ImageService,
        HttpService
    ],
    bootstrap :    [AppComponent]
})
export class AppModule {
}
