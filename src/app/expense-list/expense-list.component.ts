import { Component, OnInit} from '@angular/core';
import { ModalService } from '../expense-service.service';
import { UserDataService } from '../user-data.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit{
  
  expenseData : any = [];
  expenseDataCopy : any =[];
  constructor(private http : HttpClient, private userData : UserDataService,
    private exp : ModalService){}
  ngOnInit(){
    this.exp.expenseList$.subscribe((expenses) => {
      this.expenseData = expenses;
    });  
  }
  onEdit(expense_id : number){
     alert(expense_id);
  }
}