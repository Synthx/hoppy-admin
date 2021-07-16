import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { merge } from 'rxjs';
import { CustomDatasource } from '../models/datasource/custom-datasource';
import { User } from '../models/user/user';
import { UserService } from '../shared/services/user.service';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';

@UntilDestroy()
@Component({
    selector: 'app-user-list',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    displayedColumns: string[] = ['avatar', 'email', 'pseudo', 'role', 'creationDate', 'action'];
    dataSource: CustomDatasource<User>;

    @ViewChild(MatPaginator, { static: true })
    paginator!: MatPaginator;

    @ViewChild(MatSort, { static: true })
    sort!: MatSort;

    constructor(private readonly dialog: MatDialog, private readonly userService: UserService) {
        this.dataSource = new CustomDatasource(this.userService.search.bind(this.userService));
    }

    ngOnInit(): void {
        // reset page index on sort event
        this.sort.sortChange.pipe(untilDestroyed(this)).subscribe(() => (this.paginator.pageIndex = 0));
        // listen for changes
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(untilDestroyed(this))
            .subscribe(() => this.loadData());
        // load data
        this.loadData();
    }

    openAddUserDialog(): void {
        this.dialog.open(AddUserDialogComponent, {
            panelClass: [
                'animate__animated',
                'animate__slideInRight',
                'animate__faster',
                'fullscreen-dialog-container',
            ],
            maxHeight: '100vh',
            height: '100vh',
            maxWidth: '100vw',
            width: '100vw',
        });
    }

    loadData(): void {
        this.dataSource.load({
            page: this.paginator.pageIndex,
            size: this.paginator.pageSize,
            active: this.sort.active,
            direction: this.sort.direction,
        });
    }
}
