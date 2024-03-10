import { Component, OnInit } from '@angular/core';
import { FormStateService } from '../form-state.service';
import { ActivatedRoute, Router} from '@angular/router';
import { UserDataService } from '../user-data.service';
import { ModalService } from '../expense-service.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  firstName! : string; 
  emailid! : string;
  greeting! : string;
  currentMonth! : string;
  expenseData : any =[];
  incomeTotal! : number;
  expenseTotal! : number;
  balance! : number;
  constructor(public formStateService : FormStateService,
    public route : ActivatedRoute, private router: Router,
    private userDataService : UserDataService, private http : HttpClient,
    private exp : ModalService){}

    ngOnInit() {
      this.userDataService.currentFirstName.subscribe(firstName => {
        this.firstName = firstName;
        // console.log(this.firstName);
      });
      this.userDataService.currentEmailId.subscribe(email => {
        this.emailid = email;
        // console.log(this.emailid);
      });
      this.exp.expenseTotal$.subscribe((total) => {
        this.expenseTotal = total;
        // console.log(this.expenseTotal);
        this.calculateBalance();
      });
      this.exp.incomeTotal$.subscribe((total) => {
        this.incomeTotal = total;
        this.calculateBalance();
        // console.log(this.incomeTotal);
      });
      const params = new HttpParams().set('email', this.emailid);
      this.exp.expenseList$.subscribe((expenses) => {
        this.expenseData = expenses;
      });
      this.http.get('http://localhost:3000/expenses', {params}).subscribe(
        (data) =>{
          this.expenseData = data;
          // console.log(typeof(this.expenseData[0]['date'])); 
          // const options :Intl.DateTimeFormatOptions= { day: '2-digit', month: '2-digit', year: 'numeric' };
          if(this.expenseData){
            this.expenseData = this.expenseData.map((expense : any = []) =>{
              const dateObject = new Date(expense.date);
              // const formattedDate = new Date(expense.date).toLocaleDateString('en-US', options);
              return{
                ...expense,
                date : dateObject,
              };
            });
          this.exp.updateModal(this.expenseData);
          // console.log(typeof(this.expenseData[0]['expense_id'])); 
        }
      },
        (error) => {
          alert("Error");
        }
      );
    
      this.computeMonth();
      this.computeGreeting();
    }
    calculateBalance(){
          this.balance = this.incomeTotal - this.expenseTotal;
          if(this.balance <= 0){
            this.balance = 0;
          }
    }
    computeMonth(){
      const currentMonth = new Date().getMonth();
      const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ];
      this.currentMonth = months[currentMonth];
    }
    computeGreeting(){
      const currentTime = new Date().getHours();
      if(currentTime >= 0 && currentTime < 12){
        this.greeting = "Good morning ";
      }
      else if(currentTime >= 12 && currentTime < 17){
          this.greeting = "Good afternoon";
      }
      else{
        this.greeting = "Good evening";
      }
    }
    logout(){
      this.formStateService.onLogout();
      window.location.reload();
      window.location.href = "";
    }
    addExpense(){
      this.exp.openModal();
    }
}
