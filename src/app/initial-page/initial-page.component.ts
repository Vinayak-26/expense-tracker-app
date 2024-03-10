import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormStateService } from '../form-state.service';
@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.css']
})
export class InitialPageComponent implements OnInit{
  constructor(private router: Router, public formStateService : FormStateService){
    this.router.events.subscribe((event) =>{
      if(event instanceof NavigationEnd){
        this.formStateService.resetComponentState();
      }
    });
  }
  ngOnInit(){
    this.checkHistoryLength();
  }
  checkHistoryLength(){
    if(window.history.length <=1){
      this.router.navigate(['']);
    }
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
  this.checkHistoryLength();
  }

  displayLoginForm(){
    this.formStateService.displayLoginForm();
  }

  displayRegisterForm(){
    this.formStateService.displayRegisterForm();
  }
}
