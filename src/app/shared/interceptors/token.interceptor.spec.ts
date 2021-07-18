import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jest-marbles';
import { AuthService } from '../services/auth.service';

import { TokenInterceptor } from './token.interceptor';

describe('token.interceptor', () => {
    let authService: AuthService;
    let interceptor: TokenInterceptor;
    let httpClient: HttpClient;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                TokenInterceptor,
                HttpClient,
                {
                    provide: AuthService,
                    useValue: {
                        token: jest.fn(),
                    },
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: TokenInterceptor,
                    multi: true,
                },
            ],
        });

        httpClient = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
        authService = TestBed.inject(AuthService);
        interceptor = TestBed.inject(TokenInterceptor);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(interceptor).toBeTruthy();
    });

    it('should add X-Auth-Token header when user logged', () => {
        // given
        const headerName = 'X-Auth-Token';
        const token = 'token';

        // mock
        jest.spyOn(authService, 'token').mockReturnValue(cold('-(t|)', { t: token }));

        // call
        httpClient.get('http://localhost:8081/test').subscribe(response => {
            expect(response).toBeTruthy();
        });

        // expect
        const request = httpMock.expectOne('http://localhost:8081/test');
        expect(request.request.headers.has(headerName)).toBeTruthy();
        expect(request.request.headers.get(headerName)).toBe(token);
    });
});
