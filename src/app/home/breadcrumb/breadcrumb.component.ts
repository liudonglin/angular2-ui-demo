import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    moduleId: module.id+'',
    selector: 'home-breadcrumb',
    styleUrls: ['breadcrumb.component.css'],
    templateUrl: 'breadcrumb.component.html'
})

export class BreadcrumbComponent implements OnInit {
    constructor(private route: ActivatedRoute,
        private router: Router) {
    }
    ngOnInit(): void {
    }
    @Input() canvasOn: boolean;
}