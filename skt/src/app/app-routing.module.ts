import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioFormComponent } from './funcionario-form/funcionario-form.component';
import { FuncionarioResolver } from './guards/funcionario.resolver';

import { ProductFormComponent } from './product/containers/product-form/product-form.component';
import { ProductResolver } from './product/guards/product.resolver';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'new',
    component: ProductFormComponent,
    resolve: { product: ProductResolver },
  },
  {
    path: 'edit/:id',
    component: ProductFormComponent,
    resolve: { product: ProductResolver },
  },
  {
    path: 'funcionario',
    loadChildren: () =>
      import('./funcionario/funcionario.module').then(
        (m) => m.FuncionarioModule
      ),
  },
  {
    path: 'new2',
    component: FuncionarioFormComponent,
    resolve: { funcionario: FuncionarioResolver },
  },
  {
    path: 'edit2/:id',
    component: FuncionarioFormComponent,
    resolve: { funcionario: FuncionarioResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
