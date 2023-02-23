import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Product } from '../../../models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products$: Observable <Product[]> | null = null;


  constructor(private productService: ProductService,
    public dialog: MatDialog, private router: Router,
    private route: ActivatedRoute,  private snackBar: MatSnackBar) {

        this.refresh();
      }

      refresh() {
        this.products$ = this.productService.list()
      .pipe(
        catchError(error => {
        this.onError('Error Loading Products.');
        return of ([])
        })
      );
    }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit (): void {
  }

  onAdd() {
    this.router.navigate(['/new'], {relativeTo: this.route});
  }

  onEdit(product: Product) {
    this.router.navigate(['edit', product._id], {relativeTo: this.route});
  }

  onRemove(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure you want to remove this product?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.productService.remove(product._id).subscribe({
         next: () => {
            this.refresh();
            this.snackBar.open('Product removed successfully!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error: () => this.onError('Error when trying to remove product.')
      });
      }
    });
  }

}
