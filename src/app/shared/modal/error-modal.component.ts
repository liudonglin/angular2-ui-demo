import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from './components/modal';

@Component({
    moduleId: module.id + '',
    selector: 'error-modal',
    styleUrls: ['error-modal.component.css'],
    templateUrl: 'error-modal.component.html'
})
export class ErrorModalComponent {
    
    @ViewChild(ModalComponent)
    modal: ModalComponent;

    animation: boolean = true;


    Show(): void {
        this.modal.open();
    }

    Closed(): void {
    }

    Opened(): void {
    }

    Dismissed(): void {
    }

}