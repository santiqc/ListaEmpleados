import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from 'app/components/modals/alert/alert.component';
import { EmpleadoService } from 'app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css'],
})
export class ListEmpleadosComponent implements OnInit{
  @ViewChild(AlertComponent, { static: true })
  modals!: AlertComponent;
  public empleados: any = [];
  public loading = false;
  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getEmpleados();
  }

  public async getEmpleados() {
    try {
      this.loading = true;
      this.empleados = await this.empleadoService.getEmpleados();
    } catch (error) {
      this.toastr.error('Error al consultar empleados', 'Error!', {
        timeOut: 3000,
      });
    } finally {
      this.loading = false;
    }
  }


  public async deleteEmpleado(id: string) {
    try {
      this.loading = true;
      await this.empleadoService.deleteEmpleado(id);
      this.toastr.success('Empleado eliminado correctamente', 'Registro eliminado',{
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      })
      this.getEmpleados();
      
    } catch (error) {
      this.toastr.error('Error al eliminar el registro', 'Registro fail',{
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      })
    } finally{
      this.loading = false;
    }
  }
}
