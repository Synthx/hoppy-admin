import { Component, OnInit } from '@angular/core';
import { AuthDispatcher } from '../../store/auth/auth-dispatcher.service';

@Component({
    selector: 'app-auth-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
    constructor(private readonly authDispatcher: AuthDispatcher) {}

    ngOnInit(): void {
        this.authDispatcher.logout();
    }
}
