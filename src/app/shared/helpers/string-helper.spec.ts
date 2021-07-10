import { TestCase } from '../../models/test/test-case';
import { snakeToCamelCase, snakeToPascalCase } from './string-helper';

describe('string-helper', () => {
    describe('snakeToPascalCase', () => {
        const testCases: TestCase<string, string>[] = [
            { value: 'login', expected: 'Login' },
            { value: 'forgot-password', expected: 'ForgotPassword' },
        ];

        testCases.forEach(testCase => {
            it(`should return "${testCase.expected}" with "${testCase.value}"`, () => {
                expect(snakeToPascalCase(testCase.value)).toBe(testCase.expected);
            });
        });
    });

    describe('snakeToCamelCase', () => {
        const testCases: TestCase<string, string>[] = [
            { value: 'login', expected: 'login' },
            { value: 'forgot-password', expected: 'forgotPassword' },
        ];

        testCases.forEach(testCase => {
            it(`should return "${testCase.expected}" with "${testCase.value}"`, () => {
                expect(snakeToCamelCase(testCase.value)).toBe(testCase.expected);
            });
        });
    });
});
