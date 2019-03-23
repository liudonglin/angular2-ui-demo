import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'my-app',
    template: `<router-outlet></router-outlet>`
})
export class AppComponent{

    constructor(private route: ActivatedRoute,
        private router: Router) {
    }

}