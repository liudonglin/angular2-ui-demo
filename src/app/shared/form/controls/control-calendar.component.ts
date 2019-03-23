import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ElementRef, Renderer, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CalendarControlModel } from '../models/control-model';

@Component({
    moduleId: module.id+'',
    selector: 'control-calendar',
    styleUrls: ['control-calendar.component.css'],
    templateUrl: 'control-calendar.component.html',
    host: { '(input)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ControlCalendarComponent),
        multi: true
    }]
})

export class ControlCalendarComponent implements ControlValueAccessor, OnInit, AfterViewInit{

    constructor(private _renderer: Renderer, private _elementRef: ElementRef) { }

    ngOnInit(): void {
        this.$input = this._elementRef.nativeElement.querySelector('input');
    }

    ngAfterViewInit(): void {
        this.buildMonthWeeks(this.currentYear, this.currentMonth);
    }

    @Input() controlModel: CalendarControlModel;

    //目前只支持yyyy-MM-dd格式
    SetPickerValue(value: string) {
        if (value == null || value=='') {
            this.currentDay = new Date().getDate();
            this.currentMonth = new Date().getMonth() + 1;
            this.currentYear = new Date().getFullYear();
        } else {
            let datas = value.split('-');
            try {
                this.currentYear = Number.parseInt(datas[0]);
                this.currentMonth = Number.parseInt(datas[1]);
                this.currentDay = Number.parseInt(datas[2]);
            } catch(e){
                throw new Error(`${this.controlModel.key}的值${this.controlModel.value}不是有效的日期格式,请修改为yyyy-MM-dd格式`);
            }
        }
        this.pickerValue = value;
    }
    
    //日期下拉框展开
    private pickerOpen: boolean = false;
    private togglePickerOpen(): void {
        this.pickerOpen = !this.pickerOpen;
    }
    private hiddenPicker(): void {
        this.pickerOpen = false;
    }
    //日选择器显示
    private daysPickerShow: boolean = true;
    //月选择器显示
    private monthsPickerShow: boolean = false;
    //年选择器显示
    private yearsPickerShow: boolean = false;
    
    private currentDay: number ;
    private currentMonth: number ;
    private currentYear: number ;
    
    private calendarWeeks: CalendarWeek[] = new Array<CalendarWeek>();
    private calendarMonths: string[] = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    private calendarYears: number[];

    private pickerValue: string;

    //获取指定月份总周数
    private buildMonthWeeks(year: number, month: number)
    {
        let calendarDays: CalendarDisplayDay[] = new Array<CalendarDisplayDay>();
        let firstDayOfWeek = new Date(Date.parse(year + '-' + (month > 9 ? month.toString() : '0' + month.toString()) + '-' + '01')).getDay();
        let lastDayOfWeek = new Date(Date.parse(year + '-' + (month > 9 ? month.toString() : '0' + month.toString()) + '-' + this.getMonthDays(year, month))).getDay();
        //本月总天数
        let currentMonthAllDays = this.getMonthDays(year, month);
        //应该包含上月天数
        let lastMonthNeedDays = firstDayOfWeek == 0 ? 6 : firstDayOfWeek - 1;

        //上月天数总天数
        let lastMonthAllDays = this.getMonthDays(month == 1 ? year - 1 : year, month == 1 ? 12 : month - 1);

        //应该包含下月天数
        let nextMonthNeedDays = lastDayOfWeek == 0 ? 0 : 7 - lastDayOfWeek;

        //总周数
        let totalWeeks = (currentMonthAllDays + lastMonthNeedDays + nextMonthNeedDays) / 7;

        for (let i = 1; i <= lastMonthNeedDays; i++) {
            let currentDay: CalendarDisplayDay = new CalendarDisplayDay();
            currentDay.year = month == 1 ? year - 1 : year;
            currentDay.day = lastMonthAllDays - lastMonthNeedDays + i;
            currentDay.month = month == 1 ? 12 : month - 1;
            currentDay.dayOfWeek = firstDayOfWeek - lastMonthNeedDays + (i - 1);
            calendarDays.push(currentDay);
        }
        for (let i = 0; i < currentMonthAllDays; i++) {
            let currentDay: CalendarDisplayDay = new CalendarDisplayDay();
            currentDay.year = year;
            currentDay.day = i + 1;
            currentDay.month = month;
            currentDay.dayOfWeek = (firstDayOfWeek + i) % 7;
            calendarDays.push(currentDay);
        }

        for (let i = 0; i < nextMonthNeedDays + 7; i++) {
            let currentDay: CalendarDisplayDay = new CalendarDisplayDay();
            currentDay.year = month == 12 ? year + 1 : year;
            currentDay.day = i + 1;
            currentDay.month = month == 12 ? 1 : month + 1;
            currentDay.dayOfWeek = (lastDayOfWeek + i) % 7 == 6 ? 0 : (lastDayOfWeek + i) % 7 + 1;
            calendarDays.push(currentDay);
        }
        this.calendarWeeks = new Array<CalendarWeek>();
        for (let i = 0; i < totalWeeks + 1; i++) {
            let currentWeek = new CalendarWeek();
            currentWeek.index = i;
            currentWeek.days = calendarDays.splice(0, 7);
            this.calendarWeeks.push(currentWeek);
        }
    }
    //获取指定月份总天数
    private getMonthDays(year: number, month: number) {
        let months_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let currentMonthDays = months_days[month - 1];
        if (month == 2 && this.leapyear(year)) {
            currentMonthDays = currentMonthDays + 1;
        }
        return currentMonthDays;
    }
    //判断平年闰年
    private leapyear(year: number) {
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
            return true;
        }
        return false;
    }
    //点击上一月
    private prevMonth(): void{
        this.currentMonth = this.currentMonth == 1 ? 12 : this.currentMonth - 1;
        this.currentYear = this.currentMonth == 1 ? this.currentYear - 1 : this.currentYear;
        this.buildMonthWeeks(this.currentYear, this.currentMonth);
    }
    //点击下一月
    private nextMonth(): void {
        this.currentMonth = this.currentMonth == 12 ? 1 : this.currentMonth + 1;
        this.currentYear = this.currentMonth == 12 ? this.currentYear + 1 : this.currentYear;
        this.buildMonthWeeks(this.currentYear, this.currentMonth);
    }
    //点击选择具体某天
    private selectDay(day: CalendarDisplayDay): void {
        this.currentYear = day.year;
        this.currentMonth = day.month;
        this.currentDay = day.day;
        this.pickerValue = this.buildPickerValue(this.currentYear, this.currentMonth, this.currentDay);
        this.onChange(this.pickerValue);
        this.pickerOpen = false;
    }

    private buildPickerValue(year: number, month: number, day: number) :string{
        let _pickerValue = year + '-'
            + (month > 9 ? month.toString() : '0' + month.toString()) + '-'
            + (day > 9 ? day.toString() : '0' + day.toString());
        return _pickerValue
    }

    private prevYear(): void {
        this.currentYear = this.currentYear - 1;
    }
    private nextYear(): void {
        this.currentYear = this.currentYear + 1;
    }

    private MonthsPickerOpen(year: number): void {
        this.daysPickerShow = false;
        this.monthsPickerShow = true;
        this.yearsPickerShow = false;
        if (year != null) {
            this.currentYear = year;
        }
    }
    private DaysPickerOpen(month: number): void {
        this.currentMonth = month + 1;
        this.buildMonthWeeks(this.currentYear, this.currentMonth);
        this.daysPickerShow = true;
        this.monthsPickerShow = false;
        this.yearsPickerShow = false;
    }
    private YearsPickerOpen(): void {
        this.daysPickerShow = false;
        this.monthsPickerShow = false;
        this.yearsPickerShow = true;
        this.calendarYears = new Array<number>();
        let startYear = this.currentYear - this.currentYear % 10 - 1;
        for (let i = 0; i < 12; i++) {
            this.calendarYears.push(startYear + i);
        }
    }
    private prevYearRange(): void{
        for (let i = 0; i < 12; i++) {
            this.calendarYears[i] = this.calendarYears[i] - 10;
        }
    }
    private nextYearRange(): void{
        for(let i = 0; i < 12; i++) {
            this.calendarYears[i] = this.calendarYears[i] + 10;
        }
    }

    //实现ControlValueAccessor接口
    $input: HTMLElement;

    onChange = (_: any) => { };
    onTouched = () => { };

    writeValue(currentValue: any) {
        const normalizedValue = currentValue == null ? '' : currentValue;
        this.SetPickerValue(currentValue);
    }
    
    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this._renderer.setElementProperty(this.$input, 'disabled', isDisabled);
    }
}

class CalendarWeek {
    days: CalendarDisplayDay[];
    index: number;
}

class CalendarDisplayDay {
    day: number;
    month: number;
    year: number;
    dayOfWeek: number;
}