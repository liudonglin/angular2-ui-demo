import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { UserMenuComponent } from './header/usermenu.component';
import { MessagesMenuComponent } from './header/messagesmenu.component';
import { MenubarComponent } from './menubar/menubar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from '../index/index.component';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        HomeRoutingModule,
        CommonModule,
        SharedModule
    ],
    declarations: [
        HomeComponent,
        HeaderComponent,
        UserMenuComponent,
        MessagesMenuComponent,
        MenubarComponent,
        BreadcrumbComponent,
        FooterComponent,
        IndexComponent
    ],
    providers: [
    ]
})
export class HomeModule { }