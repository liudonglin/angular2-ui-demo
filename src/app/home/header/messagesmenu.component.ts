import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CanvaStatus } from './header-enum';

@Component({
    moduleId: module.id+'',
    selector: 'home-header-messagesmenu',
    styleUrls: ['messagesmenu.component.css'],
    templateUrl: 'messagesmenu.component.html'
})

export class MessagesMenuComponent implements OnInit {
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