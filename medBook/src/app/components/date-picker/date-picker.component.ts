import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector :    'app-date-picker',
    templateUrl : './date-picker.component.html'
})
export class DatePickerComponent {
    @Input() selectedDate;
    @Output() onChange:EventEmitter<string> = new EventEmitter();

    setDate(newDate) {
        this.selectedDate.setDate(newDate);
        this.onChange.emit(this.selectedDate);
    }

    previousDay() {
        this.setDate(this.selectedDate.getDate() - 1);
    }

    nextDay() {
        this.setDate(this.selectedDate.getDate() + 1);
    }
}
