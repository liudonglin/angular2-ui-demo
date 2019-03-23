import { Component, OnInit, Input, TemplateRef, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/core';

@Component({
    moduleId: module.id+'',
    selector: 'box-primary',
    styleUrls: ['box-primary.component.css'],
    templateUrl: 'box-primary.component.html',
    animations: [
        
        trigger('BoxOpen', [
            state('open', style({ opacity: 1, height: '*' })),
            state('collapse', style({ opacity: 0, height: 0 })),
            transition('collapse => open', animate('400ms ease-in')),
            transition('open => collapse', animate('400ms ease-in'))
        ])
    ]
})

export class BoxPrimaryComponent implements OnInit, OnDestroy {
    constructor() {
    }
    ngOnInit(): void {
        this.open = true;
    }
    ngOnDestroy(): void {
    }

    //box标题
    @Input() title: string;
    //box主题模板
    @Input() bodyTemplate: TemplateRef<any>;
    //box页脚模板
    @Input() footerTemplate: TemplateRef<any>;
    //是否能折叠
    @Input() canCollapse: boolean = true;
    //是否关闭
    @Input() canClose: boolean = false;

    @Input() open: boolean;
    toggleOpen(): void {
        this.open = !this.open;
    }
    getOpenStr(): string {
        return this.open ? 'open':'collapse';
    }

    private destroy: boolean;

    closeBox(): void {
        this.destroy = true;
    }
}