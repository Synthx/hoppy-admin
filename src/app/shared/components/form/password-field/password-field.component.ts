import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-password-field',
    templateUrl: './password-field.component.html',
    styleUrls: ['./password-field.component.scss'],
})
export class PasswordFieldComponent {
    @Input()
    name!: string;

    @Input()
    autocomplete?: string;

    showPassword = false;

    changeVisibility(): void {
        this.showPassword = !this.showPassword;
    }
}
