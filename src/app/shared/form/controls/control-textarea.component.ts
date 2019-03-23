import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ElementRef, Renderer, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TextAreaControlModel } from '../models/control-model';

@Component({
    moduleId: module.id+'',
    selector: 'control-textarea',
    styleUrls: ['control-textarea.component.css'],
    templateUrl: 'control-textarea.component.html',
    host: { '(input)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ControlTextareaComponent),
        multi: true
    }]
})

export class ControlTextareaComponent implements ControlValueAccessor, OnInit {

    constructor(private _renderer: Renderer, private _elementRef: ElementRef) { }

    ngOnInit(): void {
        this.$textarea = this._elementRef.nativeElement.querySelector('textarea');
    }

    @Input() controlModel: TextAreaControlModel;

    $textarea: HTMLElement;

    onChange = (_: any) => { };
    onTouched = () => { };
    //
    writeValue(currentValue: any) {
        const normalizedValue = currentValue == null ? '' : currentValue;
        this._renderer.setElementProperty(this.$textarea, 'value', normalizedValue);
    }

    //实现ControlValueAccessor接口
    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this._renderer.setElementProperty(this.$textarea, 'disabled', isDisabled);
    }
}