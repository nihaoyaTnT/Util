﻿//============== 文本框包装器=====================
//Copyright 2018 何镇汐
//Licensed under the MIT license
//================================================
import { Component, Input, ViewChild,OnInit, } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormControlWrapperBase } from './base/form-control-wrapper-base';
import { MessageConfig } from '../config/message-config';

/**
 * Mat文本框包装器
 */
@Component({
    selector: 'mat-textbox-wrapper',
    template:`
        <mat-form-field [floatPlaceholder]="floatPlaceholder">
            <input matInput [name]="name" [type]="type" [placeholder]="placeholder" [disabled]="disabled" [readonly]="readonly"
                #inputModel="ngModel" [ngModel]="model" (ngModelChange)="onModelChange($event)"
                (blur)="blur($event)" (focus)="focus($event)" (keydown)="keydown($event)"
                [required]="required" [email]="type==='email'"
                [minlength]="minLength" [maxlength]="maxLength"
            />
            <mat-hint *ngIf="startHint" align="start">{{startHint}}</mat-hint>
            <mat-hint *ngIf="endHint" align="end">{{endHint}}</mat-hint>
            <span *ngIf="prefixText" matPrefix>{{prefixText}}&nbsp;</span>
            <button *ngIf="showClearButton&&model" matSuffix mat-button mat-icon-button  (click)="inputModel.reset()" [matTooltip]="clearButtonTooltip">
                <mat-icon >close</mat-icon>
            </button>
            <mat-icon *ngIf="suffixMaterialIcon" matSuffix [style.cursor]="'pointer'" (click)="$event.stopPropagation();suffixIconClick()">{{suffixMaterialIcon}}</mat-icon>
            <i *ngIf="suffixFontAwesomeIcon" matSuffix class="fa fa-lg {{suffixFontAwesomeIcon}}" [style.cursor]="'pointer'" (click)="$event.stopPropagation();suffixIconClick()"></i>
            <span *ngIf="suffixText" matSuffix>{{suffixText}}</span>            
            <mat-error *ngIf="inputModel?.invalid">{{getErrorMessage()}}</mat-error>
        </mat-form-field>
    `
})
export class TextBoxWrapperComponent extends FormControlWrapperBase implements OnInit {
    /**
     * 清除按钮提示
     */
    private clearButtonTooltip: string;
    /**
     * 是否显示清除按钮
     */
    @Input() showClearButton: boolean;
    /**
     * 文本框类型，可选值：text,password,number,email
     */
    @Input() type: string;
    /**
     * 只读
     */
    @Input() readonly: boolean;
    /**
     * 最小长度
     */
    @Input() minLength: number;
    /**
     * 最小长度验证消息
     */
    @Input() minLengthMessage: string;
    /**
     * 最大长度
     */
    @Input() maxLength: number;
    /**
     * 电子邮件验证消息
     */
    @Input() emailMessage: string;
    /**
     * 模型
     */
    @ViewChild('inputModel') inputModel:NgModel;

    /**
     * 初始化Mat文本框包装器
     */
    constructor() {
        super();
        this.clearButtonTooltip = MessageConfig.clear;
        this.showClearButton = true;
    }

    /**
     * 组件初始化
     */
    ngOnInit() {
    }

    /**
     * 获取错误消息
     */
    private getErrorMessage() : string{
        if (!this.inputModel)
            return "";
        if (this.inputModel.hasError('required'))
            return this.requiredMessage;
        if (this.inputModel.hasError('minlength'))
            return this.minLengthMessage;
        if (this.inputModel.hasError('email'))
            return this.emailMessage;
        return "";
    }
}