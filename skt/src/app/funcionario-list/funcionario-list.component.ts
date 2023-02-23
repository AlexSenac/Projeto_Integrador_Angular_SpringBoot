import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Funcionario } from '../models/funcionario.model';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.scss'],
})
export class FuncionarioListComponent implements OnInit {
  @Input() funcionarios: Funcionario[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['name', 'email', 'cpf', 'phone', 'situacao', 'actions'];

  constructor() {}

  ngOnInit(): void {}

  onAdd() {
    this.add.emit(true);
  }

  onEdit(funcionario: Funcionario) {
    this.edit.emit(funcionario);
  }

  onRemove(funcionario: Funcionario) {
    this.remove.emit(funcionario);
  }
}
