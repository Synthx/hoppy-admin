import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { PictureDispatcher } from '../../../../store/picture/picture-dispatcher.service';
import { pictureAction } from '../../../../store/picture/picture.action';

@UntilDestroy()
@Component({
    selector: 'app-profile-picture-field',
    templateUrl: './profile-picture-field.component.html',
    styleUrls: ['./profile-picture-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ProfilePictureFieldComponent),
            multi: true,
        },
    ],
})
export class ProfilePictureFieldComponent implements OnInit, ControlValueAccessor {
    @Input()
    name!: string;

    loading: boolean = false;
    preview?: string;

    onChange?: (picture: string | null) => void;
    onTouched?: () => void;

    constructor(private readonly actions$: Actions, private readonly pictureDispatcher: PictureDispatcher) {}

    ngOnInit(): void {
        this.actions$
            .pipe(ofType(pictureAction.uploadSuccess), untilDestroyed(this))
            .subscribe(({ path }) => this.onFileSuccessfullyUploaded(path));
        this.actions$
            .pipe(ofType(pictureAction.uploadError), untilDestroyed(this))
            .subscribe(() => this.onFileUploadError());
    }

    writeValue(value: string | null): void {
        console.warn(value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    onFileSelected(event: Event): void {
        const target = event.target as HTMLInputElement;
        const files = target.files as FileList;

        if (files.length === 0) return;

        const file = files.item(0)!;
        if (!file.type.startsWith('image')) return;

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            this.loading = true;
            this.preview = fileReader.result as string;
            this.pictureDispatcher.upload(file);
        };
    }

    reset(): void {
        this.preview = undefined;
        if (this.onChange) {
            this.onChange(null);
        }
    }

    private onFileSuccessfullyUploaded(picture: string): void {
        this.loading = false;
        if (this.onChange) {
            this.onChange(picture);
        }
    }

    private onFileUploadError(): void {
        this.loading = false;
    }
}
