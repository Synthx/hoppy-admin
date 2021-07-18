import { AbstractControl, ValidationErrors } from '@angular/forms';
import { TestCase } from '../../models/test/test-case';
import { confirmPasswordValidator, passwordValidator, pseudoValidator } from './validator';

describe('validator', () => {
    describe('confirmPasswordValidator', () => {
        const testCases: TestCase<{ password: string; confirmPassword: string }, ValidationErrors | null>[] = [
            { value: { password: 'test', confirmPassword: 'test' }, expected: null },
            { value: { password: 'test', confirmPassword: '2' }, expected: { confirmPassword: true } },
            { value: { password: 'test', confirmPassword: 'TeST' }, expected: { confirmPassword: true } },
        ];

        testCases.forEach(testCase => {
            it(`should return "${testCase.expected}" with "${testCase.value}"`, () => {
                const { password, confirmPassword } = testCase.value;
                const control = {
                    value: {
                        password,
                        confirmPassword,
                    },
                } as AbstractControl;

                expect(confirmPasswordValidator()(control)).toStrictEqual(testCase.expected);
            });
        });
    });

    describe('passwordValidator', () => {
        const testCases: TestCase<string, ValidationErrors | null>[] = [
            { value: 'Test59$_test', expected: null },
            { value: 'test', expected: { strongPassword: true } },
            { value: 'Test', expected: { strongPassword: true } },
            { value: 'Test59', expected: { strongPassword: true } },
            { value: 'Test59$', expected: { strongPassword: true } },
        ];

        testCases.forEach(testCase => {
            it(`should return "${testCase.expected}" with "${testCase.value}"`, () => {
                const control = {
                    value: testCase.value,
                } as AbstractControl;

                expect(passwordValidator()(control)).toStrictEqual(testCase.expected);
            });
        });
    });

    describe('pseudoValidator', () => {
        const testCases: TestCase<string, ValidationErrors | null>[] = [
            { value: 'test', expected: null },
            { value: 'test76', expected: null },
            { value: 'test-76', expected: null },
            { value: 'test;76', expected: { pseudo: true } },
        ];

        testCases.forEach(testCase => {
            it(`should return "${testCase.expected}" with "${testCase.value}"`, () => {
                const control = {
                    value: testCase.value,
                } as AbstractControl;

                expect(pseudoValidator()(control)).toStrictEqual(testCase.expected);
            });
        });
    });
});
