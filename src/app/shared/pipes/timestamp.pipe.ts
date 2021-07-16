import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import dayjs from 'dayjs';
import { map } from 'rxjs/operators';

@Pipe({
    name: 'timestamp',
    pure: false,
})
export class TimestampPipe implements OnDestroy, PipeTransform {
    private asyncPipe: AsyncPipe;

    constructor(private readonly cd: ChangeDetectorRef, private readonly translateService: TranslateService) {
        this.asyncPipe = new AsyncPipe(cd);
    }

    ngOnDestroy(): void {
        this.asyncPipe.ngOnDestroy();
    }

    transform(value: number, relative: boolean = false): string | null {
        if (relative) {
            return dayjs().to(dayjs(value));
        }

        return this.asyncPipe.transform(
            this.translateService.get('date.format').pipe(map(format => dayjs(value).format(format))),
        );
    }
}
