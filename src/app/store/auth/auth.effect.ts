import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class AuthEffect {
    constructor(private readonly actions$: Actions, private readonly authService: AuthService) {}
}
