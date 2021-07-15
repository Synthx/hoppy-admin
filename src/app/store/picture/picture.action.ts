import { createAction, props } from '@ngrx/store';

const upload = createAction('picture/upload', props<{ file: File }>());
const uploadSuccess = createAction('picture/upload-success', props<{ path: string }>());
const uploadError = createAction('picture/upload-error', props<{ error: any }>());

export const pictureAction = {
    upload,
    uploadSuccess,
    uploadError,
};
