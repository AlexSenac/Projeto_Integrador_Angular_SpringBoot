import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { Funcionario } from '../models/funcionario.model';
import { FuncionarioService } from '../services/funcionario.service';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioResolver implements Resolve<Funcionario> {
  constructor(private funcionarioService: FuncionarioService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Funcionario> {
    if (route.params && route.params['id']) {
      return this.funcionarioService.loadById(route.params['id']);
    }
    return of({
      _id: '',
      name: '',
      email: '',
      cpf: '',
      phone: '',
      situacao: '',
    });
  }
}
