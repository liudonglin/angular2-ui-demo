import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

// 使用预编译器 (AoT - Ahead-Of-Time) 进行静态引导
//import { platformBrowser } from '@angular/platform-browser';

//import { AppModuleNgFactory } from './app.module.ngfactory';

//platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);