import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() readyLogin = false;
  @Output() logout = new EventEmitter<any>();
  constructor(private loginSrv: LoginService, private router: Router) {}

  ngOnInit(): void {}

  public async onLogout() {
    try {
      await this.loginSrv.logout();
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.log(error);
    }
  }
}
