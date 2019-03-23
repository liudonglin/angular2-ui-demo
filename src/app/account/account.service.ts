import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from '../shared/entity/user.entity'

@Injectable()
export class AccountService {

    private loginUrl = `/api/account/login`;
    private headers = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(private http: Http) { }

    public doLogin(user: User): Promise<any> {
        return this.http
            .post(this.loginUrl, { LoginName: user.LoginName, Password: user.Password }, { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
}
