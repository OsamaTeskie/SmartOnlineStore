import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiService } from '../api.service';
import * as sanitizeHtml from 'sanitize-html';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  angForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(1), Validators.email],
      ],
      login_id: ['', Validators.required],
      password: ['', Validators.required],
      admin: ['', Validators.required],
    });
  }

  ngOnInit() {}

  postdata(angForm1: FormGroup) {
    console.log(angForm1.value.admin)
    this.dataService
      .userSignup(
        sanitizeHtml(angForm1.value.login_id),
        sanitizeHtml(angForm1.value.email),
        sanitizeHtml(angForm1.value.password),
        angForm1.value.admin
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['login']);
        },
        (error) => {
          alert(`An error occurred: ${error.error.message}`)
        }
      );
  }
}
