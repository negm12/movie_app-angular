import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports:[FormsModule,RouterLink]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService
      .login({ username: this.username, password: this.password })
      .subscribe((res) => {
        console.log(res.role);

        // localStorage.setItem('user', JSON.stringify(res));
        localStorage.setItem('role', res.role);
        localStorage.setItem("username",this.username);
        localStorage.setItem("password",this.password);
        localStorage.setItem("userId",JSON.stringify(res.id))

        // this.router.navigate(['/register']);


        if (res.role=="ROLE_ADMIN"){
          this.router.navigate(['/admin-dashboard']);
        }
        else{

          this.router.navigate(['/movies']);
        }

      });
  }
}
