import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { ProviderComponent } from './component/provider/provider.component';
import { CategoryComponent } from './component/category/category.component';

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
          { path: '', loadChildren: './page/provider/provider.detail/provider.detail.module#ProviderDetailPageModule' },
          { path: 'new', loadChildren: './page/provider/provider.new/provider.new.module#ProviderNewPageModule' },
          { path: 'edit/:id', loadChildren: './page/provider/provider.edit/provider.edit.module#ProviderEditPageModule' }
        ]
      }, {
        path: 'category',
        component: CategoryComponent,
        children: [
          { path: '', loadChildren: './page/category/category.detail/category.detail.module#CategoryDetailPageModule' },
          { path: 'new', loadChildren: './page/category/category.new/category.new.module#CategoryNewPageModule' },
          { path: 'edit/:id', loadChildren: './page/category/category.edit/category.edit.module#CategoryEditPageModule' }     ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
