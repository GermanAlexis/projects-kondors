import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesComponent } from './pages/invoices/invoices/invoices.component';
import { ProductsComponent } from './pages/products/product/products.component';
import { UserComponent } from './pages/users/user/user.component';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UserComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'invoices', component: InvoicesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
