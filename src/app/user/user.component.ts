import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomDatasource } from '../models/datasource/custom-datasource';
import { User } from '../models/user/user';
import { UserService } from '../shared/services/user.service';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';

@Component({
    selector: 'app-user-list',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    displayedColumns = [];
    dataSource: CustomDatasource<User>;

    constructor(private readonly dialog: MatDialog, private readonly userService: UserService) {
        this.dataSource = new CustomDatasource(this.userService.search.bind(this));
    }

    ngOnInit(): void {}

    openAddUserDialog(): void {
        this.dialog.open(AddUserDialogComponent, {
            panelClass: ['animate__animated', 'animate__slideInRight', 'animate__fast', 'fullscreen-dialog-container'],
            maxHeight: '100vh',
            height: '100vh',
            maxWidth: '100vw',
            width: '100vw',
        });
    }
}
