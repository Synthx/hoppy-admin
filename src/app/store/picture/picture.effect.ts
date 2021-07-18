import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PictureService } from '../../shared/services/picture.service';
import { pictureAction } from './picture.action';

@Injectable()
export class PictureEffect {
    constructor(private readonly actions$: Actions, private readonly pictureService: PictureService) {}

    upload$ = createEffect(() =>
        this.actions$.pipe(
            ofType(pictureAction.upload),
            switchMap(({ file }) => {
                return this.pictureService.upload(file).pipe(
                    map(path => pictureAction.uploadSuccess({ path })),
                    catchError(error => of(pictureAction.uploadError({ error }))),
                );
            }),
        ),
    );
}
