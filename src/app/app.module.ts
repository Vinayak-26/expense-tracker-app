import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ExpenseListComponent } from './expense-list/expense-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    InitialPageComponent,
    AddExpensesComponent,
    ExpenseListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
