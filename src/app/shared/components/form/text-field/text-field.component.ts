import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import {
    ControlContainer,
    ControlValueAccessor,
    FormControl,
    FormControlDirective,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
    selector: 'app-text-field',
    templateUrl: './text-field.component.html',
    styleUrls: ['./text-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextFieldComponent),
            multi: true,
        },
    ],
})
export class TextFieldComponent implements ControlValueAccessor {
    @ViewChild(FormControlDirective, { static: true })
    formControlDirective!: FormControlDirective;

    @Input()
    type: 'text' | 'password' | 'email' | 'number' | 'color' = 'text';

    @Input()
    readonly = false;

    @Input()
    required = true;

    @Input()
    autocomplete?: string;

    @Input()
    name!: string;

    get control(): FormControl {
        return <FormControl>this.controlContainer.control!.get(this.name);
    }

    get hasError(): boolean {
        return !!this.control.errors && this.control.touched;
    }

    get errorCode(): string {
        return Object.keys(this.control.errors as object)[0];
    }

    constructor(private readonly controlContainer: ControlContainer) {}

    writeValue(value: any): void {
        this.formControlDirective.valueAccessor?.writeValue(value);
    }

    registerOnChange(fn: any): void {
        this.formControlDirective.valueAccessor?.registerOnChange(fn);
    }

    registerOnTouched(fn: any): void {
        this.formControlDirective.valueAccessor?.registerOnTouched(fn);
    }
}
