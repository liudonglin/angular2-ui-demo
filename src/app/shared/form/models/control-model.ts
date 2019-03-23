import { ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { phoneNumberValidator, forbiddenValidator} from './custom-validators.directive';

//控件类型
export enum ControlType {
    /**
    *Input文本框
    */
    Text = 1,
    /**
    *TextArea文本框
    */
    TextArea = 2,
    /**
    *Password文本框
    */
    Password = 3,
    /**
    *下拉框
    */
    Select = 4,
    Checkbox = 5,
    Radio = 6,
    /**
    *日期选择器
    */
    Calendar = 7,
    /**
    *富文本编辑器
    */
    RichText = 8,
    /**
    *多选下拉框
    */
    MultSelect = 9,
}

export abstract class ControlModel {

    /**
    *实体类的属性/字段名称
    */
    private _key: string;
    public get key(): string { return this._key }
    public set key(value: string) { this._key = value }
    /**
    *实体类的属性/字段初始值,可以是string,bool,datetime,array 根据不同控件类型具体定义
    */
    public abstract get value(): any;
    public abstract set value(val: any);
    /**
    *控件类型
    */
    public abstract get controlType(): ControlType;
    /**
    *标题
    */
    private _title: string;
    public get title(): string { return this._title }
    public set title(value: string) { this._title = value }
    /**
    *输入框placeholder
    */
    //placeholder: string;
    /**
    *验证规则
    */
    private _validator: ValidatorFn | ValidatorFn[];
    public get validator(): ValidatorFn | ValidatorFn[] { return this._validator }
    public set validator(value: ValidatorFn | ValidatorFn[]) { this._validator = value }
    /**
    *验证失败时的提示语,key为validator名称,值为提示语
    */
    private _validationMessages: { [key: string]: string; };
    public get validationMessages(): { [key: string]: string; } { return this._validationMessages }
    public set validationMessages(value: { [key: string]: string; }) { this._validationMessages = value }
    /**
    *Radio,Select控件多选项,并非所有控件都需要options，放到子类中
    */
    //options: { text: string, value: any }[];
}

export class TextControlModel extends ControlModel {
    public get controlType(): ControlType {
        return ControlType.Text;
    }

    private _placeholder: string;
    public get placeholder(): string{
        return this._placeholder;
    }
    public set placeholder(value:string){
        this._placeholder = value;
    }

    private _value: string;
    public get value(): string {
        return this._value;
    }
    public set value(value: string) {
        this._value = value;
    }
}

export class PasswordControlModel extends ControlModel {
    public get controlType(): ControlType {
        return ControlType.Password;
    }

    private _placeholder: string;
    public get placeholder(): string {
        return this._placeholder;
    }
    public set placeholder(value: string) {
        this._placeholder = value;
    }

    private _value: string;
    public get value(): string {
        return this._value;
    }
    public set value(value: string) {
        this._value = value;
    }
}

export class CalendarControlModel extends ControlModel {
    public get controlType(): ControlType {
        return ControlType.Calendar;
    }

    private _placeholder: string;
    public get placeholder(): string {
        return this._placeholder;
    }
    public set placeholder(value: string) {
        this._placeholder = value;
    }

    private _value: string;
    public get value(): string {
        return this._value;
    }
    //set的时候可以做个格式检查(hold)
    public set value(value: string) {
        this._value = value;
    }
}

export class TextAreaControlModel extends ControlModel {
    public get controlType(): ControlType {
        return ControlType.TextArea;
    }

    private _placeholder: string;
    public get placeholder(): string {
        return this._placeholder;
    }
    public set placeholder(value: string) {
        this._placeholder = value;
    }

    private _value: string;
    public get value(): string {
        return this._value;
    }
    public set value(value: string) {
        this._value = value;
    }
}

export class SelectControlModel extends ControlModel {
    public get controlType(): ControlType {
        return ControlType.Select;
    }

    private _value: any;
    public get value(): any {
        return this._value;
    }
    public set value(value: any) {
        this._value = value;
    }

    private _options: any[];
    public get options(): any[] {
        return this._options;
    }
    public set options(value: any[]) {
        this._options = value;
    }

}

export class RadioControlModel extends ControlModel {
    public get controlType(): ControlType {
        return ControlType.Radio;
    }

    private _value: any;
    public get value(): any {
        return this._value;
    }
    public set value(value: any) {
        this._value = value;
    }

    private _options: any[];
    public get options(): any[] {
        return this._options;
    }
    public set options(value: any[]) {
        this._options = value;
    }

}

export class RichTextControlModel extends ControlModel {
    public get controlType(): ControlType {
        return ControlType.RichText;
    }

    private _placeholder: string;
    public get placeholder(): string {
        return this._placeholder;
    }
    public set placeholder(value: string) {
        this._placeholder = value;
    }

    private _value: string;
    public get value(): string {
        return this._value;
    }
    public set value(value: string) {
        this._value = value;
    }
}

export class CheckboxControlModel extends ControlModel {
    public get controlType(): ControlType {
        return ControlType.Checkbox;
    }

    private _value: any[];
    public get value(): any[] {
        return this._value;
    }
    public set value(value: any[]) {
        this._value = value;
    }

    private _options: any[];
    public get options(): any[] {
        return this._options;
    }
    public set options(value: any[]) {
        this._options = value;
    }

}

export class MultSelectControlModel extends ControlModel {
    public get controlType(): ControlType {
        return ControlType.MultSelect;
    }

    private _value: any[];
    public get value(): any[] {
        return this._value;
    }
    public set value(value: any[]) {
        this._value = value;
    }

    private _options: any[];
    public get options(): any[] {
        return this._options;
    }
    public set options(value: any[]) {
        this._options = value;
    }

}