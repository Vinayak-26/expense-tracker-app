import { Component } from '@angular/core';
import { FormStateService } from '../form-state.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface RegisterResponse {
  message: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm : FormGroup;
  passwordMatchValidator : ValidatorFn;
  
  constructor(private formStateService : FormStateService,
    private fb:FormBuilder, private http : HttpClient, private router: Router){
    this.passwordMatchValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
    
      return password && confirmPassword && password.value !== confirmPassword.value
        ? { 'passwordMismatch': true }
        : null;
    };
    this.registerForm = this.fb.group({
      firstName : ['',[Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      password : ['',[Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators : this.passwordMatchValidator
    });
  }
  
  onSubmit(){
    if(this.registerForm.valid){
      const formData = this.registerForm?.value;
      const userData = {
        firstName : formData.firstName,
        email : formData.email,
        password : formData.password
      }
      this.http.post('http://localhost:3000/register', userData).subscribe(
        (response) =>{
          const data = response as RegisterResponse;
          alert(data.message);
          this.goBack();
        },
        (error) => {
          alert(JSON.stringify(error.message));
        }

      )
    }
  }
  goBack(){
   this.formStateService.resetComponentState();
   this.router.navigate(['']);
  }
}

