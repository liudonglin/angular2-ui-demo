import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { FormModule } from './form/form.module';

import { BoxModule } from './box/box.module';
//table
import { TableSimpleComponent } from './table/table-simple.component';

import { ModalModule } from './modal/modal.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        BoxModule,
        FormModule,
        ModalModule
    ],
    declarations: [
        TableSimpleComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableSimpleComponent,

        BoxModule,
        FormModule,
        ModalModule
    ]
})
export class SharedModule { }