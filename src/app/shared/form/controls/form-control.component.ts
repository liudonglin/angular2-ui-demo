import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ControlModel } from '../models/control-model';


@Component({
    moduleId: module.id+'',
    selector: 'form-control',
    styleUrls: ['form-control.component.css'],
    templateUrl: 'form-control.component.html'
})

export class FormControlComponent implements OnInit {
    constructor() {
    }

    ngOnInit(): void {
        this.title = this.controlModel.title;
        this.controlForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }

    onValueChanged(data?: any): void {
        this.errorMessage = '';
        let errors = this.controlForm.errors;
        for (const key in errors) {
            let message = this.controlModel.validationMessages[key];
            if (message != null) {
                this.errorMessage += message;
            }
        }
    }

    get hasError(): boolean {
        return this.controlForm.invalid && this.controlForm.dirty
    }

    private title: string;
    private errorMessage: string;

    @Input() controlModel: ControlModel;
    @Input() controlForm: FormControl;
    
}