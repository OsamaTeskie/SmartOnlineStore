import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './main/home.component';
// import { PaymentComponent } from './payment/payment.component';
// import { SuccessComponent } from './success/success.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  // {
  //   path: 'home',
  //   component: HomeComponent,
  // },
  // {
  //   path: 'payment',
  //   component: PaymentComponent,
  // },
  // {
  //   path: 'success',
  //   component: SuccessComponent,
  // },
  // {
  //   path: 'checkout',
  //   component: CheckoutComponent,
  // },
  // {
  //   path: 'about',
  //   component: AboutComponent,
  // },
  // {
  //   path: 'shoppingCart',
  //   component: CartComponent,
  // },
  // {
  //   path: 'contact',
  //   component: ContactComponent,
  // },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}