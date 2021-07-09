import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { TextFieldComponent } from './components/form/text-field/text-field.component';
import { PasswordFieldComponent } from './components/form/password-field/password-field.component';
import { CheckboxComponent } from './components/form/checkbox/checkbox.component';

@NgModule({
    declarations: [UserAvatarComponent, TextFieldComponent, PasswordFieldComponent, CheckboxComponent],
    imports: [CommonModule, ReactiveFormsModule, TranslateModule, MatIconModule, MatButtonModule, MatCheckboxModule],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        MatIconModule,
        MatButtonModule,
        UserAvatarComponent,
        TextFieldComponent,
        PasswordFieldComponent,
        CheckboxComponent,
    ],
})
export class SharedModule {}
