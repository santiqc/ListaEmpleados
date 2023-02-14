import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmpleadosComponent } from './pages/empleados/create-empleados/create-empleados.component';
import { ListEmpleadosComponent } from './pages/empleados/list-empleados/list-empleados.component';
import { LoginComponent } from './pages/empleados/login/login.component';

import {
  AngularFireAuthGuard,
  canActivate,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
const routes: Routes = [
  {
    path: '',
    component: ListEmpleadosComponent,
    ...canActivate(() => redirectUnauthorizedTo(['login'])),
  },
  { path: 'empleados', component: ListEmpleadosComponent },
  {
    path: 'createEmpleado',
    component: CreateEmpleadosComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'editarEmpleado/:id',
    component: CreateEmpleadosComponent,
    canActivate: [AngularFireAuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
