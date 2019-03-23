import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CanvaStatus } from './header-enum';

@Component({
    moduleId: module.id+'',
    selector: 'home-header-usermenu',
    styleUrls: ['usermenu.component.css'],
    templateUrl: 'usermenu.component.html'
})

export class UserMenuComponent implements OnInit {
    constructor(private route: ActivatedRoute,
        private router: Router) {
    }
    ngOnInit(): void {
    }

    @Input() menuOpen: boolean;
    @Output() menuOpenChange = new EventEmitter<boolean>();

    toggleMenuOpen(): void
    {
        this.menuOpen = !this.menuOpen;
        this.menuOpenChange.emit(this.menuOpen);
    }
}