import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import {AngularFireAuthGuard, canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './authentication/login.module#LoginModule',
  },
  {
    path: '',
    component: LayoutComponent,
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {
        path: '',
        loadChildren: './pages/blank/blank.module#BlankModule',
        pathMatch: 'full'
      },
      {
        path: 'market',
        loadChildren: './pages/market/market.module#MarketModule',
      },
      {
        path: 'who-is-going',
        loadChildren: './pages/whos-going/whos-going.module#WhosGoingModule',
      },
      {
        path: 'users',
        loadChildren: './pages/users/users.module#UsersModule',
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
