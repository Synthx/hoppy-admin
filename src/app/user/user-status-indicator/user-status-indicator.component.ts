import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-user-status-indicator',
    templateUrl: './user-status-indicator.component.html',
    styleUrls: ['./user-status-indicator.component.scss'],
})
export class UserStatusIndicatorComponent {
    @Input()
    disabled!: boolean;
}
