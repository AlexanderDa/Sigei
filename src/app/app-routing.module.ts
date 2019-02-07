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
    children: [{
      path: 'provider',
      component: ProviderComponent,
      children: [
        {path: '', loadChildren: './page/provider/list.provider/list.provider.module#ProviderPageModule'}
      ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
