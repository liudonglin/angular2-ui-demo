import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBaseComponent } from './form-base.component';

@Component({
    moduleId: module.id+'',
    selector: 'form-horizontal',
    styleUrls: ['form-horizontal.component.css'],
    templateUrl: 'form-horizontal.component.html'
})

export class FormHorizontalComponent extends FormBaseComponent {
}


