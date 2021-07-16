import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserPreviewComponent } from './user-preview/user-preview.component';

@NgModule({
    declarations: [UserComponent, AddUserDialogComponent, UserPreviewComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule,
        MatTableModule,
        MatDialogModule,
        MatStepperModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSortModule,
        MatMenuModule,
    ],
})
export class UserModule {}
