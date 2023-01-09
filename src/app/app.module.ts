import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { ListEmpleadosComponent } from './components/empleados/list-empleados/list-empleados.component';
import { CreateEmpleadosComponent } from './components/empleados/create-empleados/create-empleados.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListEmpleadosComponent,
    CreateEmpleadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
