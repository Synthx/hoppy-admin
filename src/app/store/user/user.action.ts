import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user/user';

const create = createAction('user/create', props<{ user: User }>());
const createSuccess = createAction('user/create-success', props<{ user: User }>());
const createError = createAction('user/create-error', props<{ error: any }>());

const remove = createAction('user/remove', props<{ user: User }>());
const removeSuccess = createAction('user/remove-success', props<{ email: string }>());
const removeError = createAction('user/remove-error', props<{ error: any }>());

const disable = createAction('user/disable', props<{ user: User }>());
const disableSuccess = createAction('user/disable-success', props<{ email: string }>());
const disableError = createAction('user/disable-error', props<{ error: any }>());

export const userAction = {
    create,
    createSuccess,
    createError,
    remove,
    removeSuccess,
    removeError,
    disable,
    disableSuccess,
    disableError,
};
