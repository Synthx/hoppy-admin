import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { TimestampPipe } from './timestamp.pipe';

describe('timestamp.pipe', () => {
    let pipe: TimestampPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: TranslateService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
            ],
        });

        pipe = TestBed.inject(TimestampPipe);
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return a string', () => {
        const result = pipe.transform(Date.now());
        expect(typeof result).toBe('string');
    });

    it('should return date', () => {
        const result = pipe.transform(Date.now());
        expect(result).toBe('');
    });
});
