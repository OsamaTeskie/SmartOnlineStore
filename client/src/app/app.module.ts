import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NgxPayPalModule } from 'ngx-paypal';
import { ReviewsComponent } from './reviews/reviews.component';
import { AdminComponent } from './admin/admin.component';
import { MapComponent } from './map/map.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    DashboardComponent,
    CartComponent,
    AboutComponent,
    ContactComponent,
    ReviewsComponent,
    MapComponent,
    CheckoutComponent,
    OrdersComponent,

  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPayPalModule,
    HttpClientModule,
    DragDropModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'about', component: AboutComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'cart', component: CartComponent},
      {path: 'checkout', component: CheckoutComponent},
      {path: 'reviews', component: ReviewsComponent},
      {path: 'admin', component: AdminComponent},
      {path: 'orders', component: OrdersComponent},
      // the next path is the default, index page
      {path: '', component: IndexComponent},
    ])
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }