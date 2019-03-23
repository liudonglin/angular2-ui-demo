import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ControlModel, ControlType } from './models/control-model';

export class FormBaseComponent implements OnInit, OnDestroy {
    constructor() {
    }
    ngOnInit(): void {
        this.form = this.buildFormGroup(this.controlmodels);
    }
    ngOnDestroy(): void {
    }

    //form标题
    @Input() formTitle: string;

    //form元数据
    @Input() controlmodels: ControlModel[];

    private form: FormGroup;

    private buildFormGroup(controlmodels: ControlModel[]): FormGroup {
        let group: any = {};
        controlmodels && controlmodels.forEach(control => {
            group[control.key] = new FormControl(control.value, control.validator);
        });
        return new FormGroup(group);
    }
    
    @Output() onSureBtnClick = new EventEmitter<any>();
    private sureBtnClick(): void {
        this.onSureBtnClick.emit(this.form.value);
    }

    private resetBtnClick(): void {
        let source_data = {};
        for (let i = 0; i < this.controlmodels.length; i++) {
            source_data[this.controlmodels[i].key] = this.controlmodels[i].value;
        }
        this.form.setValue(source_data);
    }

}