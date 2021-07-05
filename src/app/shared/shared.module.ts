import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { TextFieldComponent } from './components/form/text-field/text-field.component';
import { PasswordFieldComponent } from './components/form/password-field/password-field.component';

@NgModule({
    declarations: [UserAvatarComponent, TextFieldComponent, PasswordFieldComponent],
    imports: [CommonModule, ReactiveFormsModule, TranslateModule, MatIconModule, MatButtonModule],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        MatIconModule,
        MatButtonModule,
        UserAvatarComponent,
        TextFieldComponent,
        PasswordFieldComponent,
    ],
})
export class SharedModule {}
