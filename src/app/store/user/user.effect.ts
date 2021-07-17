import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../../shared/services/user.service';
import { AddUserDialogComponent } from '../../user/add-user-dialog/add-user-dialog.component';
import { DeleteUserDialogComponent } from '../../user/delete-user-dialog/delete-user-dialog.component';
import { DisableUserDialogComponent } from '../../user/disable-user-dialog/disable-user-dialog.component';
import { userAction } from './user.action';

@Injectable()
export class UserEffect {
    constructor(
        private readonly actions$: Actions,
        private readonly dialog: MatDialog,
        private readonly snackBar: MatSnackBar,
        private readonly userService: UserService,
        private readonly translateService: TranslateService,
    ) {}

    create$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userAction.create),
            switchMap(({ user }) => {
                return this.userService.add(user).pipe(
                    map(user => userAction.createSuccess({ user })),
                    catchError(error => of(userAction.createError({ error }))),
                );
            }),
        ),
    );

    createSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(userAction.createSuccess),
                switchMap(({ user }) => this.translateService.get('user.add.success', { email: user.email })),
                tap(message => {
                    this.dialog.getDialogById(AddUserDialogComponent.ID)?.close(true);
                    this.snackBar.open(message);
                }),
            ),
        { dispatch: false },
    );

    remove$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userAction.remove),
            switchMap(({ user }) => {
                return this.userService.delete(user.id).pipe(
                    map(() => userAction.removeSuccess({ email: user.email })),
                    catchError(error => of(userAction.removeError({ error }))),
                );
            }),
        ),
    );

    removeSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(userAction.removeSuccess),
                switchMap(({ email }) => this.translateService.get('user.remove.success', { email })),
                tap(message => {
                    this.dialog.getDialogById(DeleteUserDialogComponent.ID)?.close(true);
                    this.snackBar.open(message);
                }),
            ),
        { dispatch: false },
    );

    disable$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userAction.disable),
            switchMap(({ user }) => {
                return this.userService.update(user.id, { disabled: true }).pipe(
                    map(() => userAction.disableSuccess({ email: user.email })),
                    catchError(error => of(userAction.disableError({ error }))),
                );
            }),
        ),
    );

    disableSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(userAction.disableSuccess),
                switchMap(({ email }) => this.translateService.get('user.disable.success', { email })),
                tap(message => {
                    this.dialog.getDialogById(DisableUserDialogComponent.ID)?.close(true);
                    this.snackBar.open(message);
                }),
            ),
        { dispatch: false },
    );
}
