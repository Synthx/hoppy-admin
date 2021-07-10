import { LOCATION_INITIALIZED } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { forkJoin } from 'rxjs';
import { finalize, first } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { AuthSelector } from './store/auth/auth-selector.service';

export function loadConfigFactory(authSelector: AuthSelector) {
    return () => forkJoin([authSelector.loading$.pipe(first(loading => !loading))]).toPromise();
}

export function loadTranslationsFactory(translateService: TranslateService, injector: Injector) {
    return () =>
        new Promise<void>(resolve => {
            injector.get(LOCATION_INITIALIZED, Promise.resolve(null)).then(() => {
                const defaultLang = environment.language.default;
                translateService.setDefaultLang(defaultLang);
                translateService
                    .use(defaultLang)
                    .pipe(finalize(() => resolve()))
                    .subscribe();
            });
        });
}

export function httpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
