import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpLoaderFactory, loadConfigFactory, loadTranslationsFactory } from './app.functions';
import { FooterComponent } from './layout/footer/footer.component';
import { FullscreenComponent } from './layout/header/fullscreen/fullscreen.component';
import { HeaderComponent } from './layout/header/header.component';
import { LanguageSelectorComponent } from './layout/header/langage-selector/language-selector.component';
import { LayoutComponent } from './layout/layout.component';
import { NavigationGroupComponent } from './layout/navigation/navigation-group/navigation-group.component';
import { NavigationItemComponent } from './layout/navigation/navigation-item/navigation-item.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { SharedModule } from './shared/shared.module';
import { AuthSelector } from './store/auth/auth-selector.service';
import { AppStoreModule } from './store/store.module';

dayjs.extend(relativeTimePlugin);

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        NavigationComponent,
        HeaderComponent,
        FooterComponent,
        LanguageSelectorComponent,
        FullscreenComponent,
        NavigationItemComponent,
        NavigationGroupComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        SharedModule,
        AppRoutingModule,
        AppStoreModule,
        MatMenuModule,
        MatDividerModule,
        MatSnackBarModule,
        MatDialogModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: loadTranslationsFactory,
            deps: [TranslateService, Injector],
            multi: true,
        },
        {
            provide: APP_INITIALIZER,
            useFactory: loadConfigFactory,
            deps: [AuthSelector],
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
