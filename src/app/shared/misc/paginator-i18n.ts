import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class PaginatorI18n extends MatPaginatorIntl {
    constructor(private readonly translateService: TranslateService) {
        super();
        this.translateService.onLangChange.subscribe(() => this.loadTranslation());
        this.loadTranslation();
    }

    loadTranslation(): void {
        this.firstPageLabel = this.translateService.instant('paginator.firstPage');
        this.lastPageLabel = this.translateService.instant('paginator.lastPage');
        this.itemsPerPageLabel = this.translateService.instant('paginator.itemsPerPage');
        this.nextPageLabel = this.translateService.instant('paginator.nextPage');
        this.previousPageLabel = this.translateService.instant('paginator.previousPage');
        this.changes.next();
    }

    getRangeLabel = (page: number, pageSize: number, length: number): string => {
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

        return this.translateService.instant('paginator.range', { startIndex: startIndex + 1, endIndex, length });
    };
}
