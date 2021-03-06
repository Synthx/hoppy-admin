import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../shared/shared.module';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserPreviewComponent } from './user-preview/user-preview.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { DisableUserDialogComponent } from './disable-user-dialog/disable-user-dialog.component';
import { UserStatusIndicatorComponent } from './user-status-indicator/user-status-indicator.component';
import { UserRoleIndicatorComponent } from './user-role-indicator/user-role-indicator.component';
import { ActivateUserDialogComponent } from './activate-user-dialog/activate-user-dialog.component';

@NgModule({
    declarations: [
        UserComponent,
        AddUserDialogComponent,
        UserPreviewComponent,
        DeleteUserDialogComponent,
        DisableUserDialogComponent,
        UserStatusIndicatorComponent,
        UserRoleIndicatorComponent,
        ActivateUserDialogComponent,
    ],
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
        MatTooltipModule,
    ],
})
export class UserModule {}
