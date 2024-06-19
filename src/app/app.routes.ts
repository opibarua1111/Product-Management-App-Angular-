import { Routes } from '@angular/router';
import { ProductComponent } from './home/product/product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  // without login start
  { path: '', component: RegisterComponent },
  { path: 'register', redirectTo: '', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'product', component: ProductComponent },
];
