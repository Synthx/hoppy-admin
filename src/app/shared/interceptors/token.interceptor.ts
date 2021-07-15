import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private readonly authService: AuthService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.authService.token().pipe(
            first(),
            switchMap(token => {
                if (!!token) {
                    const headers = request.headers.append('X-Auth-Token', token);
                    return next.handle(request.clone({ headers }));
                } else {
                    return next.handle(request);
                }
            }),
        );
    }
}
