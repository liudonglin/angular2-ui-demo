import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxPrimaryComponent } from './box-primary.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BoxPrimaryComponent
    ],
    exports: [
        CommonModule,
        BoxPrimaryComponent
    ]
})
export class BoxModule { }