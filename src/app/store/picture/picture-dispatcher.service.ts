import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { pictureAction } from './picture.action';

@Injectable({
    providedIn: 'root',
})
export class PictureDispatcher {
    constructor(private readonly store: Store<AppState>) {}

    upload(file: File): void {
        this.store.dispatch(pictureAction.upload({ file }));
    }
}
