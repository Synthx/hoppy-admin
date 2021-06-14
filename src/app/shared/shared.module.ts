import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';

@NgModule({
    declarations: [UserAvatarComponent],
    imports: [CommonModule],
    exports: [CommonModule, ReactiveFormsModule, TranslateModule, MatIconModule, MatButtonModule, UserAvatarComponent],
})
export class SharedModule {}
