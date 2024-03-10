import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserDataService } from './user-data.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard implements CanDeactivate<LoginComponent> {
  
  constructor(private userDataService: UserDataService,
    private router: Router){}

  canDeactivate(component: LoginComponent) :boolean  {
    if(this.userDataService.changeToken()) {
      // If the user is logged in, prevent deactivation (going back)
      return false;
    }
   else{
    this.router.navigate(['/initial']);
    return true;
   }
  }

}
