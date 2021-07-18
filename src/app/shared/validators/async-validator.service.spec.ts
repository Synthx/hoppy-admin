import { TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { cold } from 'jest-marbles';
import { UserService } from '../services/user.service';

import { AsyncValidatorService } from './async-validator.service';

describe('async-validator.service', () => {
    let service: AsyncValidatorService;
    let userService: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AsyncValidatorService,
                {
                    provide: UserService,
                    useValue: {
                        emailExist: jest.fn(),
                        pseudoExist: jest.fn(),
                    },
                },
            ],
        });

        userService = TestBed.inject(UserService);
        service = TestBed.inject(AsyncValidatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('uniqueEmail', () => {
        it('should return null if email is not taken', () => {
            // given
            const control = {
                value: 'test@hoppy.fr',
            } as AbstractControl;

            // mock
            jest.spyOn(userService, 'emailExist').mockReturnValue(cold('-t', { t: false }));

            // call
            const result = service.uniqueEmail()(control);

            // expect
            expect(result).toBeObservable(cold('-t', { t: null }));
        });

        it('should return validation error if email is already taken', () => {
            // given
            const control = {
                value: 'test@hoppy.fr',
            } as AbstractControl;

            // mock
            jest.spyOn(userService, 'emailExist').mockReturnValue(cold('-t', { t: true }));

            // call
            const result = service.uniqueEmail()(control);

            // expect
            expect(result).toBeObservable(cold('-t', { t: { uniqueEmail: true } }));
        });
    });

    describe('uniquePseudo', () => {
        it('should return null if pseudo is not taken', () => {
            // given
            const control = {
                value: 'test',
            } as AbstractControl;

            // mock
            jest.spyOn(userService, 'pseudoExist').mockReturnValue(cold('-t', { t: false }));

            // call
            const result = service.uniquePseudo()(control);

            // expect
            expect(result).toBeObservable(cold('-t', { t: null }));
        });

        it('should return validation error if pseudo is already taken', () => {
            // given
            const control = {
                value: 'test',
            } as AbstractControl;

            // mock
            jest.spyOn(userService, 'pseudoExist').mockReturnValue(cold('-t', { t: true }));

            // call
            const result = service.uniquePseudo()(control);

            // expect
            expect(result).toBeObservable(cold('-t', { t: { uniquePseudo: true } }));
        });
    });
});
