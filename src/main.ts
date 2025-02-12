// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
// import { provideHttpClient } from '@angular/common/http';



// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';
//   bootstrapApplication(AppComponent, {
//     ...appConfig,
//     providers: [provideRouter(routes), provideHttpClient()]
//   }).catch(err => console.error(err));


  import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/interceptors/auth-interceptor.service';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])) // ✅ Register interceptor
  ]
}).catch(err => console.error(err));
