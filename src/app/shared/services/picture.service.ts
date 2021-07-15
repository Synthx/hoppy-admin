import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class PictureService {
    constructor(private readonly storage: AngularFireStorage) {}

    upload(data: Blob): Observable<string> {
        const id = uuidv4();
        const ref = this.storage.ref(id);

        return new Observable(resolver => {
            ref.put(data, {}).then(() => {
                ref.getDownloadURL().subscribe(url => resolver.next(url));
            });
        });
    }
}
