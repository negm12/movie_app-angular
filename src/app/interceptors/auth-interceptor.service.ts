// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptorService implements HttpInterceptor {

//   private user = localStorage.getItem("username");
//   private  pass = localStorage.getItem("password");

//     // const userObj = JSON.parse(this.user);
//   private username = this.user;  // Replace with actual username
//   private password = this.pass;  // Replace with actual password

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const authHeader = 'Basic ' + btoa(`${this.username}:${this.password}`);

//     const authReq = req.clone({
//       setHeaders: {
//         Authorization: authHeader
//       }
//     });

//     return next.handle(authReq);
//   }
// }


// 88888888888888888888888888888888888888888
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  if (username && password) {
    const encodedCredentials = btoa(`${username}:${password}`);
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Basic ${encodedCredentials}`
      }
    });
    return next(authReq);
  }

  return next(req);
};



// 8888888888888888888888888888888888888888888888

// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     const username = localStorage.getItem('username');
//     const password = localStorage.getItem('password');

//     if (username && password) {
//       const basicAuth = 'Basic ' + btoa(`${username}:${password}`);

//       const authReq = req.clone({
//         setHeaders: {
//           Authorization: basicAuth
//         }
//       });

//       return next.handle(authReq);
//     }

//     return next.handle(req);
//   }
// }

