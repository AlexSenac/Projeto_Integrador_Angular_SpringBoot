import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {

  constructor( private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<Product> {
    if(route.params && route.params['id']) {
      return this.productService.loadById( route.params['id']);
    }
    return of({
      _id: '',
      name: '',
      amount: '',
      purchasePrice: '',
      percentage: '',
      saleValue: '',
      category: '',
      supplier: '',
      corporateName: '',
      cnpj: '',
      phone: '',
    });
  }
}
