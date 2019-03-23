import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BoxModule } from '../box/box.module';
//form表单
import { FormHorizontalComponent } from './form-horizontal.component';
import { FormDemoComponent } from './form-demo.component';
import { ControlTextComponent } from './controls/control-text.component';
import { FormControlComponent } from './controls/form-control.component';
import { ControlSelectComponent } from './controls/control-select.component';
import { ControlCheckboxComponent } from './controls/control-checkbox.component';
import { ControlRadioComponent } from './controls/control-radio.component';
import { ControlPasswordComponent } from './controls/control-password.component';
import { ControlTextareaComponent } from './controls/control-textarea.component';
import { ControlCalendarComponent } from './controls/control-calendar.component';
import { ControlRichTextComponent } from './controls/control-richtext.component';
import { ControlMultSelectComponent } from './controls/control-multSelect.component';
//验证规则
import {
    PhoneNumberValidatorDirective,
    ForbiddenValidatorDirective,
    UserNameValidatorDirective,
    DateTimeValidatorDirective,
    EmailValidatorDirective,
    PositiveIntValidatorDirective,
    MoneyValidatorDirective
} from './models/custom-validators.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        BoxModule
    ],
    declarations: [
        FormHorizontalComponent,
        FormDemoComponent,
        FormControlComponent,
        ControlTextComponent,
        ControlSelectComponent,
        ControlCheckboxComponent,
        ControlRadioComponent,
        ControlPasswordComponent,
        ControlTextareaComponent,
        ControlCalendarComponent,
        ControlRichTextComponent,
        ControlMultSelectComponent,
        PhoneNumberValidatorDirective,
        ForbiddenValidatorDirective,
        UserNameValidatorDirective,
        DateTimeValidatorDirective,
        EmailValidatorDirective,
        PositiveIntValidatorDirective,
        MoneyValidatorDirective
    ],
    exports: [
        FormHorizontalComponent,
        FormDemoComponent,
        FormControlComponent,
        ControlTextComponent,
        ControlSelectComponent,
        ControlCheckboxComponent,
        ControlRadioComponent,
        ControlPasswordComponent,
        ControlTextareaComponent,
        ControlCalendarComponent,
        ControlRichTextComponent,
        ControlMultSelectComponent,
        PhoneNumberValidatorDirective,
        ForbiddenValidatorDirective,
        UserNameValidatorDirective,
        DateTimeValidatorDirective,
        EmailValidatorDirective,
        PositiveIntValidatorDirective,
        MoneyValidatorDirective
    ]
})
export class FormModule {
}