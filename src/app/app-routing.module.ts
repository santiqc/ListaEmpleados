import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmpleadosComponent } from './components/empleados/create-empleados/create-empleados.component';
import { ListEmpleadosComponent } from './components/empleados/list-empleados/list-empleados.component';

const routes: Routes = [
  {path: '', component: ListEmpleadosComponent},
  {path: 'empleados', component: ListEmpleadosComponent},
  {path: 'createEmpleado', component: CreateEmpleadosComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
