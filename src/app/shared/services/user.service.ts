import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user/user';
import { CrudService } from './crud.service';

@Injectable({
    providedIn: 'root',
})
export class UserService extends CrudService<User> {
    private readonly endpointUrl = `${environment.apiUrl}/users`;

    constructor(firestore: AngularFirestore, private readonly http: HttpClient) {
        super('users', firestore);
    }

    add(user: User): Observable<User> {
        return this.http.post<User>(this.endpointUrl, user);
    }

    update(id: string, user: Partial<User>): Observable<User> {
        return this.http.patch<User>(`${this.endpointUrl}/users/${id}`, user);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.endpointUrl}/users`);
    }
}
