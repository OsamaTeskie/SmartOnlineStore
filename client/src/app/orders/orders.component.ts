import { Component, } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders:any[]=[]
  userid:any;
  myData:any[]=[];
  constructor(private http:HttpClient) { }

  ngOnInit(){
    this.getData();
    this.getItems();
  }
  getData(){
    this.userid=localStorage.getItem("token")
    fetch(`https://localhost/630/orders.php?userid=${this.userid}`,
      {
        method: "GET",
        mode: "cors",
      }).then((res) => res.json())
      .then((data) => {
        for (const item of data) {
          item["items"] = JSON.parse(item["items"])

          this.orders.push(item);
        }
      })
      console.log(this.myData);
  }
  getItems()
  {
    let url = "https://localhost/630/items.php";
    var final;
    this.http.get(url).subscribe((result:any)=>
    {
      final = result.map((element: any) => JSON.parse(element));
      this.myData= final;
    });
    
  }
}
