import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';
import { AuthEffect } from './auth/auth.effect';
import { metaReducers } from './meta.reducer';
import { SettingsEffect } from './settings/settings.effect';

@NgModule({
    imports: [
        StoreModule.forRoot(appReducer, {
            metaReducers,
        }),
        EffectsModule.forRoot([SettingsEffect, AuthEffect]),
        StoreRouterConnectingModule.forRoot(),
    ],
})
export class AppStoreModule {}
