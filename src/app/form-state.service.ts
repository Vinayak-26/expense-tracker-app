import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  constructor(private router : Router){}
  displayLogin = false;
  displayRegister = false;
  isComponentActive = false;
  isWelcomePage = true;
  activateHome = false;

  displayLoginForm(){
    this.displayLogin = true;
    this.displayRegister = false;
    this.isComponentActive = false;
    this.isWelcomePage = false;
  }
  displayRegisterForm(){
    this.displayLogin = false;
    this.displayRegister = true;
    this.isComponentActive = true;
    this.router.navigate(['/register']);

  }
  resetComponentState(){
    this.isComponentActive = false;
    this.displayLogin = false;
    this.displayRegister = false;
    this.isWelcomePage = true;
  }

  loginSuccess(){
    this.isWelcomePage = false;
    this.activateHome = true;
    this.isComponentActive =true;
  }
  onLogout(){
    this.activateHome = false;
    this.isWelcomePage = true;
    this.displayLogin = false;
    this.isComponentActive = false;
  }
}
