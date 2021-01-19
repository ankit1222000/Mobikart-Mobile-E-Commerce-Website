import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './Components/home/home.component';
import { ProductComponent } from './Components/product/product.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CartComponent } from './Components/cart/cart.component';
import { ShopComponent } from './Components/shop/shop.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { ConfirmationComponent } from './Components/confirmation/confirmation.component';
import { AdminOrdersComponent } from './Components/admin-orders/admin-orders.component';
import { AgGridModule } from 'ag-grid-angular';
import { OrderComponent } from './Components/order/order.component';
import { AdminOrderDashComponent } from './Components/admin-order-dash/admin-order-dash.component';

import { AdminSidebarComponent } from './Components/admin-sidebar/admin-sidebar.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { EmailComponent } from './Components/email/email.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AddProductComponent,
    HomeComponent,
    ProductComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    ShopComponent,
    LoginComponent,
    RegisterComponent,
    CheckoutComponent,
    ConfirmationComponent,
    AdminOrdersComponent,
    OrderComponent,
    AdminOrderDashComponent,
    
    AdminSidebarComponent,
    
    EmailComponent,
    
    ChangePasswordComponent,
    
    
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    Ng2SearchPipeModule,
    NgxPaginationModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
