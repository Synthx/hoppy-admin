import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { TextFieldComponent } from './components/form/text-field/text-field.component';
import { PasswordFieldComponent } from './components/form/password-field/password-field.component';
import { CheckboxComponent } from './components/form/checkbox/checkbox.component';
import { ProfilePictureFieldComponent } from './components/form/profile-picture-field/profile-picture-field.component';
import { materialProvider } from './material.provider';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { CalloutComponent } from './components/callout/callout.component';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { SuccessNotificationComponent } from './components/success-notification/success-notification.component';

@NgModule({
    declarations: [
        UserAvatarComponent,
        TextFieldComponent,
        PasswordFieldComponent,
        CheckboxComponent,
        ProfilePictureFieldComponent,
        TimestampPipe,
        CalloutComponent,
        TableHeaderComponent,
        SuccessNotificationComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
    ],
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
        ProfilePictureFieldComponent,
        TimestampPipe,
        CalloutComponent,
        TableHeaderComponent,
    ],
    providers: [...materialProvider],
})
export class SharedModule {}
