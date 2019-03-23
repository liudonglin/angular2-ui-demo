import {
    Component,
    OnInit
} from '@angular/core';
import {
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes
} from '@angular/animations';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { AccountService } from './account.service'
import { User } from '../shared/entity/user.entity'

@Component({
    moduleId: module.id+'',
    selector: 'login-page',
    styleUrls: ['login.component.css'],
    templateUrl: 'login.component.html',
    animations: [
        trigger('NameflyInOut', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                animate(500, keyframes([
                    style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateX(25px)', offset: 0.4 }),
                    style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
                ]))
            ])
        ]),
        trigger('PasswordflyInOut', [
            state('in', style({ opacity: 1,transform: 'translateX(0)' })),
            transition('void => *', [
                style({ opacity: 0,transform: 'translateX(-100%)' }),
                animate('0.5s  300ms', keyframes([
                    style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateX(25px)', offset: 0.4 }),
                    style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
                ]))
            ])
        ])
    ]
})

export class LoginComponent implements OnInit {
    
    constructor(private route: ActivatedRoute,
        private router: Router,
        private service: AccountService) {
    }

    user: User;

    ngOnInit(): void {
        this.user = new User();
        this.user.LoginName = '';
        this.user.Password = '';

        this.logining = false;
    }

    logining: boolean;

    SignIn(): void {
        let page = this;
        this.logining = true;

        // this.service.doLogin(this.user).then(data => {
        //     if (data.Success == true) {
        //         page.router.navigate(['/home/index']);
        //     }
        //     else {
        //         alert(data.Message);
        //         page.logining = false;
        //     }
        // });
        page.router.navigate(['/home/index']);
    }

}
