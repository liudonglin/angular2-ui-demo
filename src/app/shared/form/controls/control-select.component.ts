import { Component, OnChanges, SimpleChanges, OnInit, Input, AfterViewInit} from '@angular/core';
import { ElementRef, Renderer, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SelectControlModel } from '../models/control-model';

@Component({
    moduleId: module.id+'',
    selector: 'control-select',
    styleUrls: ['control-select.component.css'],
    templateUrl: 'control-select.component.html',
    host: { '(blur)': 'onTouched()' },
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ControlSelectComponent),
        multi: true
    }]
})

export class ControlSelectComponent implements ControlValueAccessor, OnInit{

    constructor(private _renderer: Renderer, private _elementRef: ElementRef) { }

    ngOnInit(): void {
        this.$input = this._elementRef.nativeElement.querySelector('span[class=select2-selection__rendered]');
        this.currentOptions = this.controlModel.options;
    }

    currentSelect: { text: string, value: any };
    currentOptions: { text: string, value: any }[];
    $input: HTMLElement;
    dropdown: boolean = false;
    searchText: string = '';

    @Input() controlModel: SelectControlModel;

    private onSearchTextChange(arg: string): void {
        this.currentOptions = [];
        for (let i = 0; i < this.controlModel.options.length; i++){
            if (this.controlModel.options[i].text.indexOf(arg) != -1) {
                this.currentOptions.push(this.controlModel.options[i]);
            }
        }
    }

    private toggleDropdown(): void {
        this.dropdown = !this.dropdown;
    }

    private selectOption(_currentSelect: { text: string, value: any }): void {
        this.currentSelect = _currentSelect;
        this.writeValue(this.currentSelect.value);
        this.onChange(this.currentSelect.value);
        this.dropdown = false;
    }
    
    onChange = (_: any) => { };
    onTouched = () => { };
    //
    writeValue(currentValue: any) {
        this.currentSelect = { text: '', value: null };
        if (this.controlModel.options != null) {
            for (let i = 0; i < this.controlModel.options.length; i++) {
                if (this.controlModel.options[i].value == currentValue) {
                    this.currentSelect = this.controlModel.options[i];
                    break;
                }
            }
        }
        let displayText = this.currentSelect ? this.currentSelect.text : '';
        this.$input.innerText = displayText;
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