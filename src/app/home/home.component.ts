import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    moduleId: module.id+'',
    selector: 'home-page',
    styleUrls: ['home.component.css'],
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    constructor(private route: ActivatedRoute,
        private router: Router ) {
    }

    //头和菜单是否展开
    canvasOn: boolean;

    ngOnInit(): void {
        this.canvasOn = true;
    }

    onCanvasChange(_canvasOn: boolean) {
        this.canvasOn = _canvasOn;
    }
    
}
