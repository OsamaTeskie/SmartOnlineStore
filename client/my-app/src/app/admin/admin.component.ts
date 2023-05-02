import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import {HttpClient} from '@angular/common/http';
import * as sanitizeHtml from 'sanitize-html';
import { catchError, first, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {
  names:any;
  data:any;
  angForm: FormGroup;
  constructor(private dataService: ApiService, private http:HttpClient, private fb: FormBuilder) {
    this.data = {
      action: "",
      tableName: "",
      searchId: ""
    }
    this.angForm = this.fb.group({
      query: ['', Validators.required],
      table: ['', Validators.required],
    });
  }
  
  getItemNames(){
    let url = "https://localhost/630/tableNames.php";
    this.http.get(url).subscribe((result:any)=>
    {
      this.names = result;
      console.log(result)
    });
  }

  
  ngOnInit() {
    this.getItemNames();
  }

  postdata(angForm1:any) {
    console.log('.');
    return this.http
      .post<any>(environment.apiUrl + '/query.php', {
        query: angForm1.value.query,
      })
      .pipe(
        map((res) => {
          return res;
        })
      )
      .pipe(first())
      .subscribe((data) => {
        let result: any = document.querySelector('#result');
        console.log(data);
        result.textContent = JSON.stringify(data, undefined, 2);
      });
  }

  tableSelected(angForm1:any) {
    angForm1.patchValue({ query: `SELECT * FROM ${angForm1.value.table}` });
    this.postdata(angForm1);
  }

  isLoggedIn() {
    return this.dataService.isLoggedIn();
  }

  isAdmin() {
    return this.dataService.isAdmin();
  }

}