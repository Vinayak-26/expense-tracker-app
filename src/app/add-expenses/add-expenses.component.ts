import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ModalService } from '../expense-service.service';
import { UserDataService } from '../user-data.service';
import { HttpClient } from '@angular/common/http';

interface expensesForm{
  message : string;
}
@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.css']
})
export class AddExpensesComponent implements OnInit {
  addExpenseForm : FormGroup;
  today : string;
  expenseData : any = [];
  constructor(private fb: FormBuilder, private exp: ModalService, 
    private userDataService : UserDataService, private http : HttpClient){
    this.addExpenseForm = fb.group({
      income_expense : [false],
      date : [Date, [Validators.required]],
      amount : ['0', [Validators.required, Validators.min(0)]],
      category : ['Others',[Validators.required]],
      note: ['']
    });
    const options :Intl.DateTimeFormatOptions= { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.today = new Date().toLocaleDateString('en-US', options);
    this.addExpenseForm.get('date')?.setValue(this.today);
}
  ngOnInit(){
    this.exp.expenseList$.subscribe((expenses) => {
      this.expenseData = expenses; 
    })
  }
  onSubmit(){
    if(this.addExpenseForm.valid){
      const addExpenseData = this.addExpenseForm?.value;
      const userData ={
        user_id : this.userDataService.email,
        income_expense : addExpenseData.income_expense,
        date : addExpenseData.date,
        amount : addExpenseData.amount,
        category : addExpenseData.category,
        note : addExpenseData.note
      }
      this.http.post('http://localhost:3000/expenses', userData).subscribe(
        (response) =>{
          this.exp.addExpense(userData);
          const data = response as expensesForm;
          alert(data.message);
          this.exp.updateModal(this.expenseData);
        },
        (error) => {
          alert(JSON.stringify(error.message));
        }
      );
      this.exp.closeModal();

    }
  }
  cancel(){
    this.exp.closeModal();
  }
}
