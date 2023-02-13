import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from 'app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css'],
})
export class CreateEmpleadosComponent implements OnInit {
  public createEmpleado!: FormGroup;
  public subbmitted = false;
  public loading = false;
  public id!: string | null;
  public titulo = 'Crear Empleado';

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private activedRouter: ActivatedRoute
  ) {
    this.initControl();
  }

  ngOnInit(): void {
    this.init();
  }

  public initControl() {
    this.createEmpleado = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, Validators.minLength(4)]],
      documento: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      salario: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
    this.id = this.activedRouter.snapshot.paramMap.get('id');
  }

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
      this.loading = true;
      await this.empleadoService.addEmpleado(empleado);
      this.toastr.success('Empleado agregado con exito', 'Exito!', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
      this.loading = false;
      this.router.navigate(['/listEmpleados']);
    } catch (error) {
      this.toastr.error('Error al crear el empleado', 'Error!', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
    }
  }

  public async editEmpleado() {
    try {
      this.loading = true;
      this.subbmitted = true;

      const empleado: any = {
        nombre: this.createEmpleado.value.nombre,
        apellido: this.createEmpleado.value.apellido,
        documento: this.createEmpleado.value.documento,
        salario: this.createEmpleado.value.salario,
        fechaActualizacion: new Date(),
      };
      const id: string = this.id ? this.id : '';
      await this.empleadoService.updateEmpleado(id, empleado);

      this.toastr.success('Empleado actualizado con exito', 'Exito!', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
      this.router.navigate(['/listEmpleados']);
    } catch (error) {
      this.toastr.error('Error actualizar el empleado', 'Error!', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
    } finally {
      this.loading = false;
    }
  }
  public async init() {
    try {
      this.loading = true;
      this.titulo = 'Editar Empleado';
      if (this.id !== null) {
        const response: any = await this.empleadoService.getEmpleado(this.id);
        for (const empleado of response) {
          this.createEmpleado.setValue({
            nombre: empleado.nombre,
            apellido: empleado.apellido,
            documento: empleado.documento,
            salario: empleado.salario,
          });
        }
      }
    } catch (error) {
      this.toastr.error('Error cargar datos', 'Error!', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
    } finally {
      this.loading = false;
    }
  }
}
