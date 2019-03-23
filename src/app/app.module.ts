import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//登录注册
import { AccountModule } from './account/account.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        BrowserAnimationsModule,

        AccountModule
    ],
    declarations: [AppComponent], //（声明） - 本模块中拥有的视图类。 Angular有三种视图类：组件、指令和管道。
    bootstrap: [AppComponent] // 标识出应用的主视图（被称为 根 组 件 ），它是所有其它视图的宿主。只有根模块才能设置bootstrap属性
})
export class AppModule { }
