import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../../shared/services/user.service';
import { DeleteUserDialogComponent } from '../../user/delete-user-dialog/delete-user-dialog.component';
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
                switchMap(() => this.translateService.get('user.add.success')),
                tap(message => {
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
                switchMap(({ email }) => this.translateService.get('user.remove.success')),
                tap(message => {
                    this.dialog.getDialogById(DeleteUserDialogComponent.ID)?.close(true);
                    this.snackBar.open(message);
                }),
            ),
        { dispatch: false },
    );
}
