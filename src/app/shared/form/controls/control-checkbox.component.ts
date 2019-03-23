import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ElementRef, Renderer, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CheckboxControlModel } from '../models/control-model';

@Component({
    moduleId: module.id+'',
    selector: 'control-checkbox',
    styleUrls: ['control-checkbox.component.css'],
    templateUrl: 'control-checkbox.component.html',
    host: { '(blur)': 'onTouched()' },
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ControlCheckboxComponent),
        multi: true
    }]
})

export class ControlCheckboxComponent implements ControlValueAccessor, OnInit, AfterViewInit{
    currentSelects: { text: string, value: any }[] = [];

    private onCheckClick(_currentSelect: { text: string, value: any }): void {
        let _index: number = -1;
        for (let i = 0; i < this.currentSelects.length; i++) {
            if (this.currentSelects[i].value == _currentSelect.value) {
                _index = i;
                break;
            }
        }
        if (_index == -1) {
            this.currentSelects.push(_currentSelect);
        }
        else {
            this.currentSelects.splice(_index, 1);
        }
        this.setSelectValues();
    }

    constructor(private _renderer: Renderer, private _elementRef: ElementRef) { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        this.writeValue(this.controlModel.value);
    }

    @Input() controlModel: CheckboxControlModel;

    private isSelected(option: { text: string, value: any }): boolean {
        return this.currentSelects.find(x => x.value == option.value) != null;
    }

    private setSelectValues(): void {
        let result: any[] = [];
        for (let i = 0; i < this.currentSelects.length; i++) {
            result.push(this.currentSelects[i].value);
        }
        this.onChange(result);
    }

    onChange = (_: any) => { };
    onTouched = () => { };
    //
    writeValue(currentValue: any[]) {
        if (currentValue == null) return;
        this.currentSelects = [];
        if (this.controlModel.options != null) {
            for (let i = 0; i < this.controlModel.options.length; i++) {
                if (currentValue.indexOf(this.controlModel.options[i].value) != -1) {
                    this.currentSelects.push(this.controlModel.options[i]);
                }
            }
        }
    }

    //实现ControlValueAccessor接口
    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {

    }
}