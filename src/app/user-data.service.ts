import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private firstNameSource = new BehaviorSubject<string>('');
  currentFirstName = this.firstNameSource.asObservable();
  private emailIdSource = new BehaviorSubject<string>('');
  currentEmailId = this.emailIdSource.asObservable();
  loginToken = false; // upon successfull login it is made true
  email = '';
  constructor() { }
  
  changeFirstName(firstName: string, email : string) {
    this.firstNameSource.next(firstName);
    this.emailIdSource.next(email);
  }
 changeToken(){
    this.loginToken = true;
    return this.loginToken;
  }
  setEmail(email : string){
    this.email = email;
  }
}
