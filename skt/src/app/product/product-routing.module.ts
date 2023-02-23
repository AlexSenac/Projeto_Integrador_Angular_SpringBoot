import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './componentsGroup/product-list/product-list.component';
import { ProductFormComponent } from './containers/product-form/product-form.component';
import { ProductComponent } from './containers/product/product.component';
import { ProductResolver } from './guards/product.resolver';

const routes: Routes = [
  { path: '', component: ProductComponent},
  { path: 'new', component: ProductFormComponent, resolve: {product: ProductResolver}},  
  {path: 'edit/:id', component: ProductFormComponent, resolve: { product: ProductResolver }},  
  { path: 'list', component: ProductListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
