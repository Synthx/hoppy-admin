import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';
import { AuthEffect } from './auth/auth.effect';
import { metaReducers } from './meta.reducer';
import { PictureEffect } from './picture/picture.effect';
import { RouterEffect } from './router/router.effect';
import { SettingsEffect } from './settings/settings.effect';
import { UserEffect } from './user/user.effect';

@NgModule({
    imports: [
        StoreModule.forRoot(appReducer, {
            metaReducers,
        }),
        EffectsModule.forRoot([SettingsEffect, AuthEffect, UserEffect, PictureEffect, RouterEffect]),
        StoreRouterConnectingModule.forRoot(),
    ],
})
export class AppStoreModule {}
