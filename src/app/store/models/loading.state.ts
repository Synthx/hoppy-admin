import { CrudOperation } from '../../models/crud/crud-operation';

export type LoadingState = {
    [Property in CrudOperation]: boolean;
};

export const initialLoadingState: LoadingState = {
    load: false,
    create: false,
    update: false,
    remove: false,
};
