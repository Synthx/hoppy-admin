import { Component, Input } from '@angular/core';
import { User } from '../../models/user/user';

@Component({
    selector: 'app-user-preview',
    templateUrl: './user-preview.component.html',
    styleUrls: ['./user-preview.component.scss'],
})
export class UserPreviewComponent {
    @Input()
    user!: User;
}
