import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { first, map, switchMap } from 'rxjs/operators';
import { Page } from '../../models/datasource/page';
import { Query } from '../../models/datasource/query';

export class CrudService<T> {
    protected collection: AngularFirestoreCollection<T>;

    constructor(readonly path: string, readonly firestore: AngularFirestore) {
        this.collection = this.firestore.collection(path);
    }

    search(params: Query): Observable<Page<T>> {
        const startIndex = params.page * params.size;

        return fromPromise(this.collection.ref.startAt(startIndex).limit(params.size).get()).pipe(
            map(query => {
                return {
                    content: [],
                    totalElements: query.size,
                    number: 0,
                    numberOfElements: 0,
                    size: 0,
                    totalPages: 0,
                };
            }),
        );
    }

    getAll(): Observable<T[]> {
        return this.collection.valueChanges().pipe(first());
    }

    get(id: string): Observable<T | undefined> {
        return this.collection
            .doc(id)
            .get()
            .pipe(map(snapshot => snapshot.data()));
    }

    add(object: T): Observable<T> {
        return fromPromise(this.collection.add(object)).pipe(
            switchMap(ref => fromPromise(ref.get())),
            map(snapshot => snapshot.data()!),
        );
    }

    delete(id: string): Observable<void> {
        return fromPromise(this.collection.doc(id).delete());
    }
}
