import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ElementRef, Renderer, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PasswordControlModel } from '../models/control-model';


@Component({
    moduleId: module.id+'',
    selector: 'control-password',
    styleUrls: ['control-password.component.css'],
    templateUrl: 'control-password.component.html',
    host: { '(input)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ControlPasswordComponent),
        multi: true
    }]
})

export class ControlPasswordComponent implements ControlValueAccessor, OnInit{

    constructor(private _renderer: Renderer, private _elementRef: ElementRef) {}

    ngOnInit(): void {
        this.$input = this._elementRef.nativeElement.querySelector('input');
    }

    $input: HTMLElement;
    @Input() controlModel: PasswordControlModel;

    onChange = (_: any) => { };
    onTouched = () => { };
    //实现ControlValueAccessor接口
    writeValue(currentValue: any) {
        const normalizedValue = currentValue == null ? '' : currentValue;
        this._renderer.setElementProperty(this.$input, 'value', normalizedValue);
    }
    
    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this._renderer.setElementProperty(this.$input, 'disabled', isDisabled);
    }

}