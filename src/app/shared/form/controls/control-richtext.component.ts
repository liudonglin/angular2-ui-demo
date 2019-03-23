import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ElementRef, Renderer, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RichTextControlModel } from '../models/control-model';

const Quill = require('quill/dist/quill.js');

@Component({
    moduleId: module.id+'',
    selector: 'control-richtext',
    styleUrls: ['control-richtext.component.css'],
    templateUrl: 'control-richtext.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ControlRichTextComponent),
        multi: true
    }]
})

export class ControlRichTextComponent implements ControlValueAccessor, OnInit
{
    constructor(private _renderer: Renderer, private _elementRef: ElementRef) {}

    @Input() controlModel: RichTextControlModel;

    ngOnInit(): void {
        let element = this._elementRef.nativeElement.querySelector('div');
        let options: Object = {
            placeholder: this.controlModel.placeholder,
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                    [{ 'direction': 'rtl' }],                         // text direction
                    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    [{ 'font': [] }],
                    [{ 'align': [] }],
                    ['clean'],                                         // remove formatting button
                    ['link', 'image', 'video']                         // link and image, video
                ]
            },
            theme: 'snow'
        }
        //初始化froala editor
        this.quill = new Quill(element, options);

        this.quill.on('text-change', (delta: any, oldDelta: any, source: any) => {
            let text = this.quill.getText();
            let html = element.children[0].innerHTML;
            if (html === '<p><br></p>') html = null;
            this.onChange(html);
        });
    }
    
    private quill: any;

    onChange = (_: any) => { };
    onTouched = () => { };

    //
    writeValue(currentValue: any) {
        if (this.quill) {
            if (currentValue) {
                this.quill.pasteHTML(currentValue);
                return;
            }
            this.quill.setText('');
        }
    }

    //实现ControlValueAccessor接口
    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }
    
}