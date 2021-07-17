import { Component, Input, OnInit } from '@angular/core';
import { UserRole } from '../../models/user/user-role';

@Component({
    selector: 'app-user-role-indicator',
    templateUrl: './user-role-indicator.component.html',
    styleUrls: ['./user-role-indicator.component.scss'],
})
export class UserRoleIndicatorComponent implements OnInit {
    @Input()
    role!: UserRole;

    color!: string;

    ngOnInit(): void {
        switch (this.role) {
            case UserRole.ADMIN:
                this.color = 'indigo';
                break;
            case UserRole.GUEST:
                this.color = 'royalBlue';
                break;
            case UserRole.USER:
            default:
                this.color = 'yellowGreen';
        }
    }
}
