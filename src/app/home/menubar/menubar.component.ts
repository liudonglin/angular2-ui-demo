import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    moduleId: module.id+'',
    selector: 'home-menubar',
    styleUrls: ['menubar.component.css'],
    templateUrl: 'menubar.component.html'
})

export class MenubarComponent implements OnInit {

    constructor(private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        this.menus = MenubarMockData.getData();
    }

    toggleMenuOpen(menu: MenuEntity): void {
        menu.open = !menu.open;
    }

    @Input() canvasOn: boolean;
    menus: MenuEntity[];

}

class MenubarMockData {
    public static getData() {
        let result: MenuEntity[] = [];

        let l1: MenuEntity = new MenuEntity();
        l1.text = 'Dashboard';
        l1.icons = 'fa fa-dashboard';

        let l2: MenuEntity = new MenuEntity();
        l2.text = 'Dashboard v1';
        l2.icons = 'fa fa-circle-o';
        l1.children.push(l2);

        let l21: MenuEntity = new MenuEntity();
        l21.text = 'Dashboard v1 level2';
        l21.icons = 'fa fa-circle-o';
        l2.children.push(l21);

        let l22: MenuEntity = new MenuEntity();
        l22.text = 'Dashboard v2 level2';
        l22.icons = 'fa fa-circle-o';
        l2.children.push(l22);

        let l3: MenuEntity = new MenuEntity();
        l3.text = 'Dashboard v2';
        l3.icons = 'fa fa-circle-o';
        l1.children.push(l3);

        let l4: MenuEntity = new MenuEntity();
        l4.text = 'Widgets';
        l4.icons = 'fa fa-th';

        result.push(l1);
        result.push(l4);
        return result;
    }
}

class MenuEntity {
    /**
    *菜单图标
    */
    public icons: string;
    /**
    *菜单文字
    */
    public text: string;
    /**
    *菜单链接
    */
    public url: string;
     /**
    *下级子菜单
    */
    public children: MenuEntity[];
    /**
    *是否展开
    */
    public open: boolean;

    public constructor() { this.children = []; }
}