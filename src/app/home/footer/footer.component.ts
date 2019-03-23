import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    moduleId: module.id+'',
    selector: 'home-footer',
    styleUrls: ['footer.component.css'],
    templateUrl: 'footer.component.html'
})

export class FooterComponent implements OnInit {
    constructor(private route: ActivatedRoute,
        private router: Router) {
    }
    ngOnInit(): void {
    }
    @Input() canvasOn: boolean;
}