import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioFormComponent } from '../funcionario-form/funcionario-form.component';
import { FuncionarioListComponent } from '../funcionario-list/funcionario-list.component';
import { FuncionarioResolver } from '../guards/funcionario.resolver';

import { FuncionarioComponent } from './funcionario.component';

const routes: Routes = [
  { path: '', component: FuncionarioComponent },
  {
    path: 'new2',
    component: FuncionarioFormComponent,
    resolve: { funcionario: FuncionarioResolver },
  },
  { path: 'list', component: FuncionarioListComponent },
  {
    path: 'edit2/:id',
    component: FuncionarioFormComponent,
    resolve: { funcionario: FuncionarioResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionarioRoutingModule {}
