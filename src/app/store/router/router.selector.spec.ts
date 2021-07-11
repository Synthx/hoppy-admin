import { Data } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';
import { TestCase } from '../../models/test/test-case';
import { AppState } from '../app.state';
import { routerSelector } from './router.selector';

function createFakeAppState(url: string, data?: Data): AppState {
    return {
        router: {
            state: {
                url,
                root: {
                    data,
                },
            },
        } as RouterReducerState,
    } as AppState;
}

describe('router.selector', () => {
    describe('url', () => {
        it('should return current route url', () => {
            // given
            const state = createFakeAppState('/auth/login');

            // call
            const result = routerSelector.url(state);

            // expect
            expect(result).toBe('/auth/login');
        });
    });

    describe('data', () => {
        it('should return current route data', () => {
            // given
            const data: Data = { key: 'test' };
            const state = createFakeAppState('/auth/login', data);

            // call
            const result = routerSelector.data(state);

            // expect
            expect(result).toBe(data);
        });
    });

    describe('titleKey', () => {
        const testCases: TestCase<string, string>[] = [
            { value: '/', expected: '' },
            { value: '/auth', expected: 'auth' },
            { value: '/auth/login', expected: 'auth.login' },
            { value: '/auth/forget-password', expected: 'auth.forgetPassword' },
            { value: '/beers/colors/add', expected: 'beers.colors.add' },
        ];

        testCases.forEach(testCase => {
            it(`should return "${testCase.expected}" with  "${testCase.value}"`, () => {
                const result = routerSelector.titleKey(createFakeAppState(testCase.value));
                expect(result).toBe(testCase.expected);
            });
        });
    });
});
