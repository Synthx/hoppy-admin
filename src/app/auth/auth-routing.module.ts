import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { GuestGuard } from '../shared/guards/guest.guard';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const authRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                canActivate: [GuestGuard],
                children: [{ path: 'login', component: LoginComponent }],
            },
            {
                path: '',
                canActivate: [AuthGuard],
                children: [{ path: 'logout', component: LogoutComponent }],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
})
export class AuthRoutingModule {}
