import { Component, OnInit } from '@angular/core';
import { FormStateService } from '../form-state.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';
 
interface LoginResponse {
  message: string;
  token : string;
  firstName : string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loginForm : FormGroup;

  constructor(private formStateService : FormStateService, 
    private fb : FormBuilder, private http : HttpClient,
    private router : Router, private userDataService : UserDataService,
    ){

      this.loginForm = this.fb.group({
        email : ['', [Validators.required, Validators.email]],
        password : ['',[Validators.required, Validators.minLength(6)]]
      });
    }
    
  goBack(){
    this.formStateService.resetComponentState();
    this.router.navigate(['']);
  }
  onSubmit(){
    if(this.loginForm.valid){
      const formData = this.loginForm?.value;
      const userData = {
        email : formData.email,
        password : formData.password
      }
      this.http.post('http://localhost:3000/login', userData).subscribe(
        (response) => {
          const data = response as LoginResponse;
          const email = userData.email;
          const firstName = data.firstName;
          // console.log(data.firstName);
          if(data.token){
            //  console.log(data.token);
            this.userDataService.changeFirstName(firstName, email);
            this.userDataService.changeToken();
            this.userDataService.setEmail(email);
            this.formStateService.loginSuccess();
            this.router.navigate(['/home']);       
          }
          else {
            alert('Login failed. Please check your credentials.');
          }
        },
        (error) => {
          alert(JSON.stringify(error.error.message));
       } 
      );
    }
  }

}
