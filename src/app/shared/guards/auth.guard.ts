import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthSelector } from '../../store/auth/auth-selector.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private readonly router: Router, private readonly authSelector: AuthSelector) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.authSelector.isLogged$.pipe(
            first(),
            map(isLogged => isLogged || this.router.createUrlTree(['/auth/login'])),
        );
    }
}
