import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'app/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  public logueado = true;
  public crearCuenta = false;

  constructor(
    private loginSrv: LoginService,
    private toastr: ToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.initControl();
  }

  public initControl() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  public validateForm() {
    if (!this.form.valid) {
      this.toastr.error('Campos requeridos', 'Error!', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
    } else {
      this.register();
    }
  }
  public async register() {
    try {
      const email = this.form.value.email;
      const password = this.form.value.password;
      await this.loginSrv.registerEmail(email, password);
      this.toastr.success('Cuenta creada con exito, Inicia sesion', 'Exito!', {
        positionClass: 'toast-bottom-right',
      });
      this.route.navigateByUrl('/empleados');
    } catch (error) {
      console.log(error);
    }
  }

  public async loginGogle() {
    try {
      await this.loginSrv.login();
      this.logueado = false;
      this.route.navigateByUrl('/empleados');
    } catch (error) {
      console.log(error);
    }
  }

  public async onLogout() {
    try {
      await this.loginSrv.logout();
    } catch (error) {
      console.log(error);
    }
  }

  public async login() {
    try {
      const email = this.form.value.email;
      const password = this.form.value.password;

      await this.loginSrv.loginEmail(email, password);
      this.route.navigateByUrl('/empleados');
    } catch (error) {
      console.log(error);
    }
  }
}
