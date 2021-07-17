import { Provider } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_PAGINATOR_DEFAULT_OPTIONS, MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorI18n } from './misc/paginator-i18n';

export const materialProvider: Provider[] = [
    {
        provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
        useValue: {
            pageSize: 25,
            pageSizeOptions: [25, 50],
            showFirstLastButtons: true,
        },
    },
    {
        provide: MAT_DIALOG_DEFAULT_OPTIONS,
        useValue: {
            autoFocus: false,
            panelClass: 'dialog-container',
            hasBackdrop: true,
            disableClose: true,
        },
    },
    {
        provide: MatPaginatorIntl,
        useClass: PaginatorI18n,
    },
];
