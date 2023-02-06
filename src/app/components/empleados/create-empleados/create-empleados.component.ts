import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoService } from 'app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';


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
      this.toastr.success('Empleado agregado con exito', 'Exito!',{
        timeOut: 3000,
      });
      this.router.navigate(['/listEmpleados']);
      console.table(empleado);
    } catch (error) {
      this.toastr.error('Error al crear el empleado', 'Error!', {
        timeOut: 3000,
      });

    }
  }
}
