import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FuncionarioService } from '../services/funcionario.service';
import { Location } from '@angular/common';
import { Funcionario } from '../models/funcionario.model';
@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.scss'],
})
export class FuncionarioFormComponent implements OnInit {
  formFuncionario = this.formBuilder.group({
    _id: [''],
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    situacao: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private funcionarioService: FuncionarioService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const funcionario: Funcionario = this.route.snapshot.data['funcionario'];
    this.formFuncionario.setValue({
      _id: funcionario._id,
      name: funcionario.name,
      email: funcionario.email,
      cpf: funcionario.cpf,
      phone: funcionario.phone,
      situacao: funcionario.situacao
    });
  }

  onSubmit() {
    this.funcionarioService.save(this.formFuncionario.value).subscribe({
      next: (result: Funcionario) => {
        this.onSuccess();
      },
      error: (err) => {
        this.onError();
        console.error(err);
      },
    });
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Funcionario saved successfully!', '', {
      duration: 5000,
    });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('error saving funcionario.', '', { duration: 5000 });
  }

  getErrorMessage(fieldName: string) {
    const field = this.formFuncionario.get(fieldName);

    if (field?.hasError('required')) {
      return 'Required field';
    }

    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors
        ? field.errors['minlength']['requiredLength']
        : 3;
      return `Minimum size needs to be ${requiredLength} characters.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 100;
      return `Exceeded maximum size of ${requiredLength} characters.`;
    }

    return 'Invalid field';
  }
}
