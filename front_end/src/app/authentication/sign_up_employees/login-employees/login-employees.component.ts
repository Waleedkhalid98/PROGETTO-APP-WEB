import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { enviroment } from 'src/environments/environments';
import { Employee } from 'src/app/models/employee';
import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-login-employees',
  templateUrl: './login-employees.component.html',
  styleUrls: ['./login-employees.component.scss']
})
export class LoginEmployeesComponent implements OnInit {

  response: any;
  form !: FormGroup

  constructor(
    private httpClient: HttpClient,
    private formbuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this.formbuilder.group({
      codice: ['',Validators.required],
      password: ['', Validators.required],
    })
  }
  
  logIn() {
    const codice = this.form.value.codice;
    const password = this.form.value.password;
    this.httpClient.post(`${enviroment.baseUrl}/employee/logIn`, {
      codice: codice,
      password: password
    }).subscribe(
      response => {
        this.response = response;
        if (this.response.status == 200) {
          const employeeLogged = new Employee(this.response.data.id, this.response.data.codice);
          this.userService.setUser(employeeLogged);
          this.authService.saveToken(this.response.accessToken, this.response.refreshToken);
          alert("Log In avvenuto con successo");
          this.router.navigate(['dash/employee']);
        } else {
          alert("Password o codice non corretti.");
        }
      }, err => {
        alert('Password o codice non corretti.');
      }
    );
  }




}
