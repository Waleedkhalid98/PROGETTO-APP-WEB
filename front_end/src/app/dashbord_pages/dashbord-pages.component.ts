import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { enviroment } from 'src/environments/environments';

@Component({
  selector: 'app-dashbord-pages',
  templateUrl: './dashbord-pages.component.html',
  styleUrls: ['./dashbord-pages.component.scss']
})
export class DashbordPagesComponent {

  //variabili
  userType: User | Employee | undefined;

  isEmployee: boolean | undefined;

  response: any;


  //costruttore
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private userService: UserService,

  ){}

  
  //metodo ngOnInit
  ngOnInit(): void {
    
    this.userType = this.userService.getUser();
    if (this.userType instanceof Employee) {
      this.isEmployee = true;
      

      
    } else if (this.userType instanceof User) {
      this.isEmployee = false;
      
    }
  }


  opened= false 
  isUser:any


  //metodo logOut 
  logout() {
    console.log("ciao")
    const refreshToken = localStorage.getItem('refreshToken');
    if (this.userType instanceof User) {
      this.httpClient.post(`${enviroment.baseUrl}/user/logOut`, {refreshToken: refreshToken}).subscribe(
        response => {
          this.response = response;
          if (this.response.status == 200) {
            alert("Logout avvenuto con successo");
            this.router.navigate(['home']);
          } else {
            alert("Logout fallito");
          }
        }, err => {
          alert("Logout fallito");
        }
      );
    }
    if (this.userType instanceof Employee) {
      this.httpClient.post(`${enviroment.baseUrl}/employee/logOut`, {refreshToken: refreshToken}).subscribe(
        response => {
          this.response = response;
          if (this.response.status == 200) {
            alert("Logout avvenuto con successo");
            this.router.navigate(['home']);
          } else {
            alert("Logout fallito");
          }
        }, err => {
          alert("Logout fallito");
        }
      );
    }
  }

}

