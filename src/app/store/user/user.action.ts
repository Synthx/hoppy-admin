import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user/user';

const create = createAction('user/create', props<{ user: User }>());
const createSuccess = createAction('user/create-success', props<{ user: User }>());
const createError = createAction('user/create-error', props<{ error: any }>());

export const userAction = {
    create,
    createSuccess,
    createError,
};
