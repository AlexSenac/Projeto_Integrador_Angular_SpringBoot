import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../../../models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = [
    'name',
    'amount',
    'purchasePrice',
    'percentage',
    'saleValue',
    'category',
    'supplier',
    'corporateName',
    'cnpj',
    'phone',
    'actions',
  ];

  constructor() {}

  ngOnInit(): void {}

  onAdd() {
    this.add.emit(true);
  }

  onEdit(product: Product) {
    this.edit.emit(product);
  }

  onDelete(product: Product) {
    this.remove.emit(product);
  }
}
