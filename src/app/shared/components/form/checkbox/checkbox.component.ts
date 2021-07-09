import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import {
    ControlContainer,
    ControlValueAccessor,
    FormControl,
    FormControlDirective,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true,
        },
    ],
})
export class CheckboxComponent implements ControlValueAccessor {
    @ViewChild(FormControlDirective, { static: true })
    formControlDirective!: FormControlDirective;

    @Input()
    required: boolean = true;

    @Input()
    name!: string;

    get control(): FormControl {
        return <FormControl>this.controlContainer.control!.get(this.name);
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
