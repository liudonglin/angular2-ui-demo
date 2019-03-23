import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CanvaStatus } from './header-enum';

@Component({
    moduleId: module.id+'',
    selector: 'home-header',
    styleUrls: ['header.component.css'],
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit {
    constructor(private route: ActivatedRoute,
        private router: Router) {
    }
    ngOnInit(): void {
        this.messagesMenuOpen = false;
        this.userMenuOpen = false;
    }

    toggleCanvasOn(): void {
        this.canvasOn = !this.canvasOn;
        this.onCanvasChange.emit(this.canvasOn);
    }

    @Input() canvasOn: boolean;

    @Output() onCanvasChange = new EventEmitter<boolean>();

    messagesMenuOpen: boolean;
    userMenuOpen: boolean;

    onMessagesMenuOpen(arg: boolean) {
        this.messagesMenuOpen = arg;
        this.userMenuOpen = false;
    }

    onUserMenuOpen(arg: boolean) {
        this.userMenuOpen = arg;
        this.messagesMenuOpen = false;
    }
}