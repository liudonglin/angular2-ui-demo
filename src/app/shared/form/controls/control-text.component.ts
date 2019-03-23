import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ElementRef, Renderer, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TextControlModel } from '../models/control-model';

@Component({
    moduleId: module.id+'',
    selector: 'control-text',
    styleUrls: ['control-text.component.css'],
    templateUrl: 'control-text.component.html',
    host: { '(input)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ControlTextComponent),
        multi: true
    }]
})

export class ControlTextComponent implements ControlValueAccessor, OnInit{

    constructor(private _renderer: Renderer, private _elementRef: ElementRef) { }

    ngOnInit(): void {
        this.$input = this._elementRef.nativeElement.querySelector('input');
        this.controlModel
    }
    
    @Input() controlModel: TextControlModel;

    $input: HTMLElement;

    onChange = (_: any) => { };
    onTouched = () => { };
    //
    writeValue(currentValue: any) {
        const normalizedValue = currentValue == null ? '' : currentValue;
        this._renderer.setElementProperty(this.$input, 'value', normalizedValue);
    }

    //实现ControlValueAccessor接口
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