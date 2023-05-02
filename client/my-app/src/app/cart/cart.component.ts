import { Component } from '@angular/core';
import {ItemsService} from '../items.service'
import {HttpClient} from '@angular/common/http';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  myData:any;
  trash : any[]=[];
  cart : any[]=[];
  token:any;
  map:any[]=[];
  constructor(private http:HttpClient) { }
  
  ngOnInit(){
    this.getData();
    this.getItems();
    this.token = localStorage.getItem('token')
    
    
  }

  getItems(){
    const userid=localStorage.getItem("token");
    fetch(`https://localhost/630/cart.php?id=${userid}`,
    {
      method: "GET",
      mode: "cors",
    })
    .then((response) => response.json())
    .then((data)=> {for (const item of data) {
        fetch(`https://localhost/630/find_item.php?id=${item}`)
        .then((response) => response.json())
        .then((data) => this.cart.push(data))
      }})
  }
  getData()
  {
    let url = "https://localhost/630/items.php";
    var final;
    this.http.get(url).subscribe((result:any)=>
    {
      final = result.map((element: any) => JSON.parse(element));
      this.myData= final;
      for (const item of this.myData){
        if (item.id == 7) this.myData.splice(this.myData.indexOf(item), 1);
      }

      for (const item of this.myData) {
        let url = `https://localhost/630/getItemReview.php?itemid=${item.id}`;
        this.http.get(url).subscribe((result:any) =>
        {
          this.map[item.id] = (result[item.id])
        })
      }

    });
    

  }

  dropRemove(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const raw = event.container.data[0]
      const postdata = {
        "client" : localStorage.getItem("token"),
        "item" : JSON.parse(JSON.stringify(raw)).id
      };
      fetch("https://localhost/630/remove.php", 
          {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(postdata)
          })

    }
  }

  dropKeep(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
        const postdata = {
          "client" : localStorage.getItem("token"),
          "item" : event.container.data[event.currentIndex].id
        };
        fetch("https://localhost/630/add.php", 
          {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(postdata)
          })
    }
    
  }
}