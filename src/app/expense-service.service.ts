import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDataService } from './user-data.service';
interface Expense{
  // expense_id : number;
  user_id : string;
  income_expense : boolean;
  date : Date;
  amount : number;
  category : string;
  note : string;
}
// interface EditExpense{
//   expense_id : number;
//   user_id : string;
//   income_expense : boolean;
//   date : Date;
//   amount : number;
//   category : string;
//   note : string;
// }
@Injectable({
  providedIn: 'root',
})
export class ModalService { 
  dialogRef! : MatDialogRef<AddExpensesComponent>;
  private expenseListSubject = new BehaviorSubject<Expense[]>([]);
  expenseList$: Observable<Expense[]> = this.expenseListSubject.asObservable();
  
  private incomeTotalSubject = new BehaviorSubject<number>(0);
  incomeTotal$: Observable<number> = this.incomeTotalSubject.asObservable();

  private expenseTotalSubject = new BehaviorSubject<number>(0);
  expenseTotal$: Observable<number> = this.expenseTotalSubject.asObservable();
  income! : number;
  expense! : number;
  balance! : number;
  email_id! : string;
  constructor(private dialog: MatDialog, private userDataService : UserDataService, private http : HttpClient) {}
 
  openModal() {
    this.dialogRef = this.dialog.open(AddExpensesComponent, {
      width: '400px',
      height: '400px',
      position: {top: '10%',left: '34%'},
    });
  }

  closeModal() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  addExpense(expense : Expense){
    const currentExpenses = this.expenseListSubject.value;
    currentExpenses.push(expense);
    this.expenseListSubject.next(currentExpenses);
  }

  updateModal(expenses : Expense[]){
    this.expenseListSubject.next(expenses);
    expenses.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    const currentMonth = new Date().getMonth();
    this.income = this.expenseListSubject.value.reduce((total, income) => {
      const incomeDate = new Date(income.date);
      const incomeMonth = incomeDate.getMonth();
      if(income.income_expense === true && incomeMonth === currentMonth){
        const incomeAmount = parseFloat(income.amount.toString());
        if(!isNaN(incomeAmount)){
          total += incomeAmount;
        }
      }
      return (Math.round(total / 10 ) * 10);
    }, 0);

    this.expense = this.expenseListSubject.value.reduce((total, expense) => {
      const expenseDate = new Date(expense.date);
      const expenseMonth = expenseDate.getMonth();
      if(expense.income_expense === false && expenseMonth === currentMonth){
        const expenseAmount = parseFloat(expense.amount.toString());
        if(!isNaN(expenseAmount)){
          total += expenseAmount;
        }
      }
      return (Math.round(total / 10) * 10);
    }, 0);
    
    this.incomeTotalSubject.next(this.income);
    this.expenseTotalSubject.next(this.expense);
  }

  // getExpenses(expense : EditExpense[]){
  //   this.userDataService.currentEmailId.subscribe(email => {
  //     this.email_id = email;
  //     // console.log(this.emailid);
  //   });
  //   const expenseData = [];
  //   const params = new HttpParams().set('email', this.email_id);
  //   this.http.get('http://localhost:3000/expenses', {params}).subscribe((data) =>{
  //       expense = data;
  //   });
  // }
}
