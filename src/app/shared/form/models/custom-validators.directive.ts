import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';


/**
*自定义的验证规则
*/
export class CustomValidators {

    /**
    *必填项验证,validationMessages.key = 'required'
    */
    static required: ValidatorFn = Validators.required;

    /**
    *最小长度验证,validationMessages.key = 'minlength'
    */
    static minLength(length: number): ValidatorFn {
        return Validators.minLength(length);
    }
    
    /**
    *最大长度验证,validationMessages.key = 'maxlength'
    */
    static maxLength(length: number): ValidatorFn {
        return Validators.maxLength(length);
    }
    
    /**
    *电话号码验证,validationMessages.key = 'phonenumber'
    */
    static phoneNumber: ValidatorFn = phoneNumberValidator();

    /**
    *禁止值验证,请传入要禁止的正则表达式,validationMessages.key = 'forbidden'
    */
    static forbidden(stringRe: RegExp): ValidatorFn {
        return forbiddenValidator(stringRe);
    }
    
    /**
    *账户名验证（字母.数字.下划线组成,字母开头,4-16位）,validationMessages.key = 'username'
    */
    static userName: ValidatorFn = userNameValidator();
    
    /**
    *日期格式验证('yyyy-mm-dd'为合法格式 已考虑平闰年),validationMessages.key = 'datetime'
    */
    static dateTime: ValidatorFn = dateTimeValidator();

    /**
    *邮箱格式验证,validationMessages.key = 'email'
    */
    static email: ValidatorFn = emailValidator();
    
    /**
    *正整数格式验证,validationMessages.key = 'positiveint'
    */
    static positiveInt: ValidatorFn = positiveIntValidator();

    /**
    *金额格式验证,validationMessages.key = 'money'
    */
    static money: ValidatorFn = moneyValidator();
}


/**
 * 电话号码验证
 */
export function phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const phone = control.value;
        const phoneRe = new RegExp(/^1[34578]\d{9}$/);
        const phoneNull = phone == null || phone == '';
        const error = phoneNull ? false : !phoneRe.test(phone);
        return error ? { 'phonenumber': { phone } } : null;
    };
}

@Directive({
    selector: '[phoneNumber]',
    providers: [{ provide: NG_VALIDATORS, useExisting: PhoneNumberValidatorDirective, multi: true }]
})
export class PhoneNumberValidatorDirective implements Validator, OnChanges {
    @Input() phoneNumber: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['phoneNumber'];
        if (change) {
            this.valFn = phoneNumberValidator();
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}

/**
 * 禁止字符验证
 */
export function forbiddenValidator(stringRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const value = control.value;
        const no = stringRe.test(value);
        return no ? { 'forbidden': { value } } : null;
    };
}

@Directive({
    selector: '[forbidden]',
    providers: [{ provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true }]
})
export class ForbiddenValidatorDirective implements Validator, OnChanges {
    @Input() forbidden: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['forbidden'];
        if (change) {
            const val: string | RegExp = change.currentValue;
            const re = val instanceof RegExp ? val : new RegExp(val, 'i');
            this.valFn = forbiddenValidator(re);
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}

/**
 * 用户名验证
 */
export function userNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const name = control.value;
        const nameRe = new RegExp(/^[a-zA-z]\w{4,15}$/);//字母、数字、下划线组成，字母开头，5-16位
        const nameNull = name == null || name == '';
        const error = nameNull ? false : !nameRe.test(name);
        return error ? { 'username': { name } } : null;
    };
}

@Directive({
    selector: '[userName]',
    providers: [{ provide: NG_VALIDATORS, useExisting: UserNameValidatorDirective, multi: true }]
})
export class UserNameValidatorDirective implements Validator, OnChanges {
    @Input() userName: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['userName'];
        if (change) {
            this.valFn = userNameValidator();
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}

/**
 * 日期格式验证
 */
export function dateTimeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const date = control.value;
        const dateRe = new RegExp(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/);//yyyy-mm-dd 格式的日期校验，已考虑平闰年
        const dateNull = date == null || date == '';
        const error = dateNull ? false : !dateRe.test(date);
        return error ? { 'datetime': { date } } : null;
    };
}

@Directive({
    selector: '[dateTime]',
    providers: [{ provide: NG_VALIDATORS, useExisting: DateTimeValidatorDirective, multi: true }]
})
export class DateTimeValidatorDirective implements Validator, OnChanges {
    @Input() dateTime: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['dateTime'];
        if (change) {
            this.valFn = dateTimeValidator();
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}

/**
 * 邮箱格式验证
 */
export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const email = control.value;
        const emailRe = new RegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);
        const emailNull = email == null || email == '';
        const error = emailNull ? false : !emailRe.test(email);
        return error ? { 'email': { email } } : null;
    };
}

@Directive({
    selector: '[email]',
    providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
export class EmailValidatorDirective implements Validator, OnChanges {
    @Input() email: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['email'];
        if (change) {
            this.valFn = emailValidator();
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}

/**
 * 正整数格式验证
 */
export function positiveIntValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const positiveInt = control.value;
        const positiveIntRe = new RegExp(/^[0-9]*[1-9][0-9]*$/);
        const positiveIntNull = positiveInt == null || positiveInt == '';
        const error = positiveIntNull ? false : !positiveIntRe.test(positiveInt);
        return error ? { 'positiveint': { positiveInt } } : null;
    };
}

@Directive({
    selector: '[positiveInt]',
    providers: [{ provide: NG_VALIDATORS, useExisting: PositiveIntValidatorDirective, multi: true }]
})
export class PositiveIntValidatorDirective implements Validator, OnChanges {
    @Input() positiveInt: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['positiveInt'];
        if (change) {
            this.valFn = positiveIntValidator();
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}

/**
 * 金额格式验证
 */
export function moneyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const money = control.value;
        const moneyRe = new RegExp(/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/);
        const moneyNull = money == null || money == '';
        const error = moneyNull ? false : !moneyRe.test(money);
        return error ? { 'money': { money } } : null;
    };
}

@Directive({
    selector: '[money]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MoneyValidatorDirective, multi: true }]
})
export class MoneyValidatorDirective implements Validator, OnChanges {
    @Input() money: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['money'];
        if (change) {
            this.valFn = moneyValidator();
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}