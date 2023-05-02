import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiService } from '../api.service';
import * as sanitizeHtml from 'sanitize-html';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(1), Validators.email],
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}
  postdata(angForm1: { value: { name: any; password: any } }) {
    this.dataService
      .userlogin(sanitizeHtml(angForm1.value.name), sanitizeHtml(angForm1.value.password))
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['']);
          console.log(data)
        },
        (error) => {
          alert(`An error occurred: ${error.error.message}`)
        }
      );
  }
}
