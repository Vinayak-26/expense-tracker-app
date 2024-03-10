import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';

const routes: Routes = [
  {path : '', redirectTo: 'initial', pathMatch: 'full'},
  {path: 'initial', component: InitialPageComponent},
  {path: 'home', component: HomeComponent, canDeactivate:[CanDeactivateGuard]}
  // {path: 'add-expenses', component: AddExpensesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
