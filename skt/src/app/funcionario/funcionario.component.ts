import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../models/funcionario.model';
import { FuncionarioService } from '../services/funcionario.service';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss'],
})
export class FuncionarioComponent implements OnInit {
  funcionarios$: Observable <Funcionario[]> | null = null;

  constructor(
    private funcionarioService: FuncionarioService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh() {
    this.funcionarios$ = this.funcionarioService.list()
  .pipe(
    catchError(error => {
    this.onError('Error Loading funcionario.');
    return of ([])
    })
  );
}

onError(errorMsg: string) {
this.dialog.open(ErrorDialogComponent, {
  data: errorMsg
});
}


  ngOnInit(): void {}

  onAdd() {this.router.navigate(['/new2'], {relativeTo: this.route});}

  onEdit(funcionario: Funcionario) {
    this.router.navigate(['edit2', funcionario._id], {relativeTo: this.route});
  }

  onRemove(funcionario: Funcionario) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure you want to remove this funcionario?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.funcionarioService.remove(funcionario._id).subscribe({
          next: () => {
            this.refresh();
            this.snackBar.open('Funcionario removed successfully!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
         error: () => this.onError('Error when trying to remove funcionario.')
      });
      }
    });
  }
}
