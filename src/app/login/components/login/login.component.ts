import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public user = {} as User;

  constructor(private authService: AuthService) {}

  public onLogin() {
    this.authService.login(this.user.email, this.user.password).subscribe();
  }
}
