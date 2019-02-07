import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { ProviderComponent } from './component/provider/provider.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './page/login/login.module#LoginPageModule' },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', loadChildren: './page/home/home.module#HomePageModule' },
      {
        path: 'provider',
        component: ProviderComponent,
        children: [
          { path: '', loadChildren: './page/provider/list.provider/list.provider.module#ProviderPageModule' },
          { path: 'new', loadChildren: './page/provider/new.provider/new.provider.module#NewProviderPageModule' },
          { path: 'edit', loadChildren: './page/provider/edit.provider/edit.provider.module#EditProviderPageModule' }
        ]
      }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
