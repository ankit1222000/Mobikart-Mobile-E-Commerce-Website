import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductComponent } from './Components/product/product.component';
import {CartComponent} from './Components/cart/cart.component';
import {ShopComponent} from './Components/shop/shop.component';
import {RegisterComponent } from './Components/register/register.component';
import {LoginComponent } from './Components/login/login.component';
import {AppComponent} from './app.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { ConfirmationComponent } from './Components/confirmation/confirmation.component';
import { AdminOrdersComponent } from './Components/admin-orders/admin-orders.component';
import { OrderComponent } from './Components/order/order.component';
import { AdminOrderDashComponent } from './Components/admin-order-dash/admin-order-dash.component';
import { EmailComponent } from './Components/email/email.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';




const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'product/:id',component:ProductComponent},
  //{path:'productReload/:id',component:ProductComponent},
  {path:'admin',component:AdminLoginComponent},
  {path:'adminDash',component:AdminDashboardComponent},
  {path:'productAdd',component:AddProductComponent},
  {path:'cart',component:CartComponent},
  //{path:'cartReload',component:CartComponent},
  {path:'shop',component:ShopComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'confirmation',component:ConfirmationComponent},
  {path:'adminOrder',component:AdminOrdersComponent},
  {path:'orders',component:OrderComponent},
  {path:'orderdash',component:AdminOrderDashComponent},
  {path:'email',component:EmailComponent},
  {path:'changePassword',component:ChangePasswordComponent}
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
