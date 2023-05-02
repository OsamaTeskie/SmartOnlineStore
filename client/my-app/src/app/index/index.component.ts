import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  myData:any;
  
  constructor(private http:HttpClient) { }

  ngOnInit(){
    this.getData();
  }

  getData()
  {
    let url = "http://localhost/630/items.php";
    this.http.get(url).subscribe((result:any)=>
    {
      let final = result.map((element: any) => JSON.parse(element));
      this.myData= final;
      for (const item of this.myData){
        if (item.id == 7) this.myData.splice(this.myData.indexOf(item), 1);
      }
    });
  }
}
