import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {formatDate} from '@angular/common';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5';
import * as sanitizeHtml from 'sanitize-html';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  data:any;
  myData:any;
  items:any;
  tax:any;
  itemsDetail:any[]=[];
  token:any;
  total:any;
  orderID:any;
  service:any;


  constructor(private http:HttpClient, private router: Router) { this.data = {
    name: '',
    card: '',
  }}

  ngOnInit(){
    this.service=0;
    this.getData();
    this.getItems();
    this.token = localStorage.getItem('token')
  }

  onItemChange(e:any){
    this.service = e.target.value;
  }


  onSubmit() {
    const md5 = new Md5();
    const json = {
      "client" : localStorage.getItem("token"),
      "address" : this.data.name,
      "card" : md5.appendStr(this.data.card).end()
    }
    fetch('https://localhost/630/address.php', {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(json)
    })
    const date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    // delivery type fix
    console.log(this.service);
    if (this.service == '1') {
      const express = {
        "client":localStorage.getItem("token"),
        "item": 7
      }
      fetch('https://localhost/630/add.php', {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(express)
    })
    }
    const order = {
      "dateIssue":date,
      "dateReceived":date,
      "TP":this.total,
      "paymentCode": (Math.random() + 1).toString(36).substring(7),
      "deliveryType": this.service,
      "clientID":localStorage.getItem("token"),
      "tripID": (Math.random() + 1).toString(36).substring(7),
    }
    console.log(JSON.stringify(order));

    fetch('https://localhost/630/orders.php', {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(order)
    })
    .then((data) => data.json())
    .then((response) => {
      const update = {
        "client":localStorage.getItem("token"),
        "orderid":response.orderid
      }
      fetch('https://localhost/630/update.php', {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(update)
      })    
      })
    this.redirectTo('/checkout');
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
  
  getData()
  {
    const postdata = {
      "client" : localStorage.getItem("token"),
    };

    fetch("https://localhost/630/TP.php", 
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(postdata)
        })
        .then((response) => response.json())
        .then((data)=> {this.myData = data.total_price
        this.tax = data.total_price * 0.13
        const num = Number(data.total_price) + Number(data.total_price * 0.13);
        this.total = num.toFixed(2);  
    })
  }


  getItems()
  {
    const userid=localStorage.getItem("token");
    fetch("https://localhost/630/cart.php?id="+userid,
      {
        method: "GET",
        mode: "cors",
      })
      .then((response) => response.json())
      .then((data)=> {for (const item of data) {
          fetch("https://localhost/630/find_item.php?id="+item)
          .then((response) => response.json())
          .then((data) => this.itemsDetail.push(data))
        }})
  }
}
