import { Component } from '@angular/core';
import { FormStateService } from './form-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public formStateService: FormStateService, private router: Router){}
}
