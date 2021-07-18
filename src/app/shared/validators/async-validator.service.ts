import { Injectable } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root',
})
export class AsyncValidatorService {
    constructor(private readonly userService: UserService) {}

    uniqueEmail(): AsyncValidatorFn {
        return control => {
            return this.userService
                .emailExist(control.value)
                .pipe(map(isTaken => (isTaken ? { uniqueEmail: true } : null)));
        };
    }

    uniquePseudo(): AsyncValidatorFn {
        return control => {
            return this.userService
                .pseudoExist(control.value)
                .pipe(map(isTaken => (isTaken ? { uniquePseudo: true } : null)));
        };
    }
}
