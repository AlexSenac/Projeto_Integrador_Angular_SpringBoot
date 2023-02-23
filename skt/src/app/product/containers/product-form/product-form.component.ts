import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';

import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit{

  formProduct = this.formBuilder.group({
      _id: [''],
      name: ['',[Validators.required,Validators.pattern(/^[a-zA-Z]/),
    Validators.minLength(3), Validators.maxLength(100)]],
      amount: ['',[Validators.required,Validators.pattern(/[0-9]/)]],
      purchasePrice: ['',[Validators.required]],
      percentage: ['',[Validators.required]],
      saleValue: ['',[Validators.required]],
      category: ['',[Validators.required]],
      supplier: ['',[Validators.required]],
      corporateName: ['',[Validators.required]],
      cnpj: ['',[Validators.required]],
      phone: ['',[Validators.required,Validators.pattern(/(\(?\d{2}\)?\s)?(\d{4,5}\-?\d{4})$/)]],
  });

  constructor(private formBuilder: NonNullableFormBuilder, private productService: ProductService, private snackBar: MatSnackBar, private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const product: Product = this.route.snapshot.data['product'];
    this.formProduct.setValue({
      _id: product._id,
      name: product.name,
      amount: product.amount,
      purchasePrice: product.purchasePrice,
      percentage: product.percentage,
      saleValue: product.saleValue,
      category: product.category,
      supplier: product.supplier,
      corporateName: product.corporateName,
      cnpj: product.cnpj,
      phone: product.phone,
    });
  }

  onSubmit() {
    this.productService.save(this.formProduct.value)
      .subscribe({
        next: (result: Product) => {
          this.onSuccess()
        },
        error: (err) => {
          this.onError()
          console.error(err)
        }
      });
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Product saved successfully!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('error saving product.', '', { duration: 5000 });
  }

  getErrorMessage(fieldName: string) {
    const field = this.formProduct.get(fieldName);

    if (field?.hasError('required')) {
      return 'Required field';
    }

    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 3;
      return `Minimum size needs to be ${requiredLength} characters.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Exceeded maximum size of ${requiredLength} characters.`;
    }

    return 'Invalid field';
  }
}



