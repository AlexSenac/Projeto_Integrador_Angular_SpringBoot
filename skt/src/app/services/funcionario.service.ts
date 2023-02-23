import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, first } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private readonly API = '/api/funcionario';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient
      .get<Funcionario[]>(this.API)
      .pipe(first(), delay(1000));
  }

  loadById(id: string) {
    return this.httpClient.get<Funcionario>(`${this.API}/${id}`);
  }

  save(record: Partial<Funcionario>) {
    if (record._id) {
      return this.update(record);
    }

    return this.create(record);
  }

  private create(record: Partial<Funcionario>) {
    return this.httpClient.post<Funcionario>(this.API, record).pipe(first());
  }

  private update(record: Partial<Funcionario>) {
    return this.httpClient
      .put<Funcionario>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
