import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { first, map, switchMap } from 'rxjs/operators';
import { Page } from '../../models/datasource/page';
import { Query } from '../../models/datasource/query';

export class CrudService<T> {
    protected collection: AngularFirestoreCollection<T>;

    constructor(private readonly path: string, private readonly firestore: AngularFirestore) {
        this.collection = this.firestore.collection<T>(path);
    }

    search(params: Query): Observable<Page<T>> {
        const startIndex = params.page * params.size;

        return fromPromise(
            this.collection.ref
                .orderBy(params.active, params.direction || 'desc')
                .limit(params.size)
                .get(),
        ).pipe(
            map(query => {
                return {
                    content: query.docs.map(document => document.data()),
                    totalElements: query.size,
                    number: 0,
                    numberOfElements: 0,
                    size: params.size,
                    totalPages: query.size / params.size + 1,
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

    update(id: string, object: Partial<T>): Observable<T> {
        return fromPromise(this.collection.doc(id).update(object)).pipe(
            switchMap(() => this.get(id)),
            map(object => object as T),
        );
    }

    delete(id: string): Observable<void> {
        return fromPromise(this.collection.doc(id).delete());
    }
}
