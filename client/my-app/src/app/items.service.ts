import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  myData:any;
  constructor(private http:HttpClient) {  }
  
  getData()
  {
    let url = "https://localhost/630/items.php";
    this.http.get(url).subscribe((result:any)=>
    {
      this.myData = result;
    });
  }

}
