import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ErrorModalComponent } from '../shared/modal/error-modal.component';
import {
    ControlModel,
    ControlType,
    TextControlModel,
    PasswordControlModel,
    CalendarControlModel,
    TextAreaControlModel,
    SelectControlModel,
    RadioControlModel,
    RichTextControlModel,
    CheckboxControlModel,
    MultSelectControlModel
} from '../shared/form/models/control-model';
import { CustomValidators } from '../shared/form/models/custom-validators.directive';

@Component({
    moduleId: module.id+'',
    selector: 'index-page',
    styleUrls: ['index.component.css'],
    templateUrl: 'index.component.html',
    entryComponents: [ErrorModalComponent]
})

export class IndexComponent implements OnInit {
    
    constructor(private route: ActivatedRoute,
        private viewContainer: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router) {
    }
    
    ngOnInit(): void {
        this.formModels = MockDataForHorizontalForm.getControlModels();
    }

    horizontalFormSure(agr: any) {
        console.log(agr);
    }

    modalOpen() {
        //let dialogComponentFactory =
        //    this.componentFactoryResolver.resolveComponentFactory(ErrorModalComponent);
        //let dialogComponentRef = this.viewContainer.createComponent(dialogComponentFactory);
        //dialogComponentRef.instance.Show();
    }

    formModels: ControlModel[];
}

class MockDataForHorizontalForm {
    static getControlModels(): ControlModel[] {
        let controls = new Array<ControlModel>();

        let name = new TextControlModel();
        name.key = 'name', name.value = 'gavin test', name.title = '姓名', name.placeholder = '请输入姓名', name.validator = [CustomValidators.required, CustomValidators.minLength(4)], name.validationMessages = { 'required': '姓名是必填项！', 'minlength': '长度不能小于4' };
        controls.push(name);

        let password = new PasswordControlModel();
        password.key = 'password', password.value = '123456', password.title = '密码', password.placeholder = '请输入密码', password.validator = CustomValidators.required, password.validationMessages = { 'required': '密码是必填项！' };
        controls.push(password);

        let reginTime = new CalendarControlModel();
        reginTime.key = 'reginTime', reginTime.value = '2017-03-29', reginTime.title = '时间', reginTime.placeholder = '请输入时间', reginTime.validator = CustomValidators.dateTime, reginTime.validationMessages = { 'datetime': '请输入正确的日期格式！' };
        controls.push(reginTime);

        let area = new TextAreaControlModel();
        area.key = 'area', area.value = 'test textarea', area.title = '多行文本', area.placeholder = '请输入...', area.validator = CustomValidators.required, area.validationMessages = { 'required': 'TextArea是必填项！' };
        controls.push(area);

        let select = new SelectControlModel();
        select.key = 'select', select.value = null, select.title = '选择框', select.validator = CustomValidators.required, select.validationMessages = { 'required': '选择框必选！' };
        select.options = [{ text: '请选择', value: null }, { text: '加拿大', value: 1 }, { text: '美国', value: 2 }, { text: '英国', value: 3 }, { text: '法国', value: 4 }, { text: '德国', value: 5 }, { text: '意大利', value: 6 }];
        controls.push(select);

        let radio = new RadioControlModel();
        radio.key = 'radio', radio.value = 1, radio.title = 'Radio', radio.validator = CustomValidators.required, radio.validationMessages = { 'required': 'Radio必选！' };
        radio.options = [{ text: '请选择', value: null }, { text: '加拿大', value: 1 }, { text: '美国', value: 2 }, { text: '英国', value: 3 }, { text: '法国', value: 4 }, { text: '德国', value: 5 }, { text: '意大利', value: 6 }];
        controls.push(radio);

        let richtext = new RichTextControlModel();
        richtext.key = 'richtext', richtext.value = '富文<strong>本编</strong>辑器', richtext.title = '富文本', richtext.placeholder = '请输入...', richtext.validator = CustomValidators.required, richtext.validationMessages = { 'required': '富文本是必填项！' };
        controls.push(richtext);

        let checkbox = new CheckboxControlModel();
        checkbox.key = 'checkbox', checkbox.value = [2, 4], checkbox.title = 'checkbox', checkbox.validator = CustomValidators.required, checkbox.validationMessages = { 'required': 'checkbox必选！' };
        checkbox.options = [{ text: '加拿大', value: 1 }, { text: '美国', value: 2 }, { text: '英国', value: 3 }, { text: '法国', value: 4 }, { text: '德国', value: 5 }, { text: '意大利', value: 6 }];
        controls.push(checkbox);

        let multselect = new MultSelectControlModel();
        multselect.key = 'multselect', multselect.value = [2, 4], multselect.title = '多选框', multselect.validator = CustomValidators.required, multselect.validationMessages = { 'required': '选择框必选！' };
        multselect.options = [{ text: '加拿大', value: 1 }, { text: '美国', value: 2 }, { text: '英国', value: 3 }, { text: '法国', value: 4 }, { text: '德国', value: 5 }, { text: '意大利', value: 6 }];
        controls.push(multselect);

        return controls
    }
}
