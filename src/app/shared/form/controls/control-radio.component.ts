import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ElementRef, Renderer, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RadioControlModel } from '../models/control-model';

@Component({
    moduleId: module.id+'',
    selector: 'control-radio',
    styleUrls: ['control-radio.component.css'],
    templateUrl: 'control-radio.component.html',
    host: { '(blur)': 'onTouched()' },
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ControlRadioComponent),
        multi: true
    }]
})

export class ControlRadioComponent implements ControlValueAccessor{

    $inputs: HTMLElement[];

    private onRadioClick(option: { text: string, value: any }): void {
        this.onChange(option.value);
    }

    constructor(private _renderer: Renderer, private _elementRef: ElementRef) { }

    ngOnInit(): void { }

    @Input() controlModel: RadioControlModel;

    ngAfterViewInit(): void {
        this.$inputs = this._elementRef.nativeElement.querySelectorAll('input[type=radio]');
        this.writeValue(this.controlModel.value);
    }
    
    onChange = (_: any) => { };
    onTouched = () => { };
    //
    writeValue(currentValue: any) {
        if (this.$inputs == null) return;
        for (let i = 0; i < this.$inputs.length; i++) {
            if (this.$inputs[i].getAttribute('value') == currentValue) {
                this._renderer.setElementProperty(this.$inputs[i], 'checked', true);
                break;
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