import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr/public_api';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css'],
})
export class CreateEmpleadosComponent implements OnInit {
  public createEmpleado: FormGroup;
  public subbmitted = false;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  public async agregarEmpleado() {
    try {
      this.subbmitted = true;
      if (this.createEmpleado.invalid) {
        return;
      }
      const empleado: any = {
        nombre: this.createEmpleado.value.nombre,
        apellido: this.createEmpleado.value.apellido,
        documento: this.createEmpleado.value.documento,
        salario: this.createEmpleado.value.salario,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      };

      await this.empleadoService.addEmpleado(empleado);
      console.log('Empleado agregado con exito');
      this.toastr.success('Empleado agregado con exito', 'Exito!');
      this.router.navigate(['/listEmpleados']);
      console.table(empleado);
    } catch (error) {
      console.log(error);
    }
  }
}
