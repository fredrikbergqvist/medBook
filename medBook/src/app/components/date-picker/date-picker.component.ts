import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector :    'app-date-picker',
    templateUrl : './date-picker.component.html'
})
export class DatePickerComponent implements OnChanges {
    @Input() selectedDate;
    @Output() onChange:EventEmitter<string> = new EventEmitter();
    initialized = false;

    dateForm = new FormGroup({
        date : new FormControl()
    });

    constructor(private fb:FormBuilder) {
        this.createForm();
    }

    private createForm() {
        this.dateForm = this.fb.group({
            date : new Date()
        });

        this.dateForm.valueChanges.subscribe(change => {

            if (!change.date) {
                change.date = new Date();
            }
            this.onChange.emit(change.date);
        });
    }

    ngOnChanges(changes:SimpleChanges):void {
        if (!this.initialized) {
            this.dateForm.controls['date'].updateValueAndValidity(this.selectedDate);
        }
        this.initialized = true;
    }

}
