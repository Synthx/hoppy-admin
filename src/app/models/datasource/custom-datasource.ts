import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Page } from './page';
import { Query } from './query';

export class CustomDatasource<T> implements DataSource<T> {
    private dataSubject = new BehaviorSubject<T[]>([]);
    private lengthSubject = new BehaviorSubject<number>(0);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    length$ = this.lengthSubject.asObservable();
    loading$ = this.loadingSubject.asObservable();

    constructor(private readonly searchFunction: (params: any) => Observable<Page<T>>) {}

    connect(_: CollectionViewer): Observable<T[]> {
        return this.dataSubject.asObservable();
    }

    disconnect(_: CollectionViewer): void {
        this.dataSubject.complete();
        this.lengthSubject.complete();
        this.loadingSubject.complete();
    }

    load(params: Query): void {
        this.loadingSubject.next(true);
        this.searchFunction(params)
            .pipe(
                catchError(() => of({ content: [], totalElements: 0 })),
                finalize(() => this.loadingSubject.next(false)),
            )
            .subscribe(result => {
                this.dataSubject.next(result.content);
                this.lengthSubject.next(result.totalElements);
            });
    }
}
