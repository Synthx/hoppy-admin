import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FullscreenComponent } from './layout/header/fullscreen/fullscreen.component';
import { HeaderComponent } from './layout/header/header.component';
import { LanguageSelectorComponent } from './layout/header/langage-selector/language-selector.component';
import { LayoutComponent } from './layout/layout.component';
import { NavigationGroupComponent } from './layout/navigation/navigation-group/navigation-group.component';
import { NavigationItemComponent } from './layout/navigation/navigation-item/navigation-item.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { SharedModule } from './shared/shared.module';
import { AppStoreModule } from './store/store.module';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

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
            defaultLanguage: environment.language.default,
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        SharedModule,
        AppRoutingModule,
        AppStoreModule,
        MatMenuModule,
        MatDividerModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
