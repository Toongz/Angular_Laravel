// Trước đây là một guard dạng function:
// import { CanActivateFn } from '@angular/router';
// export const checkAdminGuard: CanActivateFn = (route, state) => {
//   return true;
// };

// Hãy chuyển đổi function thành một class guard như sau:

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of , forkJoin, map, catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root' // Nếu bạn định đăng ký service trong 'providers' của module, bạn có thể bỏ qua phần này
})
export class CheckAdminGuard implements CanActivate {
   constructor(private authService: AuthService, private router: Router) {}

   canActivate(
     route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot
   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.isAdmin().pipe( 
      map(isAdmin => { 
        if (isAdmin) {
          return true; 
        } else {
          return false;       
        }
      }),
      catchError((error) => { 
        console.error(error); 
        this.router.navigate(['/login']); 
        return of(false); 
      })
    );
  }
}


  

