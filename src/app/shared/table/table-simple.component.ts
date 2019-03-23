import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    moduleId: module.id+'',
    selector: 'table-simple',
    styleUrls: ['table-simple.component.css'],
    templateUrl: 'table-simple.component.html'
})

export class TableSimpleComponent implements OnInit {
    constructor(private route: ActivatedRoute,
        private router: Router) {
    }
    ngOnInit(): void {
    }

}