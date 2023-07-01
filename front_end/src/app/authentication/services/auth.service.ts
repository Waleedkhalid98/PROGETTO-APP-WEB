import { Employee } from "src/app/models/employee";
import { User } from "src/app/models/user";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { enviroment } from "src/environments/environments";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private router: Router) { }

  //Method for save the token in localStorage when user is logged.
  saveToken(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    console.log("Access Token : " + accessToken + "\nRefreshToken : " + refreshToken);
  }

  //Method for request new tokens for User when the tokens are expired.
  refreshTokenUser() {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log("Sono dentro al metodo refresh, con token :" + refreshToken);
    return this.http.post(`${enviroment.baseUrl}/user/refreshToken`, { refreshToken });
  }

  //Method for request new tokens for Employee when the tokens are expired.
  refreshTokenEmployee() {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log("Sono dentro al metodo refresh, con token :" + refreshToken);
    return this.http.post(`${enviroment.baseUrl}/employee/refreshToken`, { refreshToken });
  }


  
  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}