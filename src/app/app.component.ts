import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
// import { LoginComponent } from './components/login/login.component';
// import { UserDashboardComponent } from "./components/user-dashboard/user-dashboard.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'movie-app';

  username = localStorage.getItem("username")

  constructor(private authService : AuthService,private route: Router,){

  }
  logout(){
    this.authService.logout()
    this.route.navigate(['/login'])

  }
}
