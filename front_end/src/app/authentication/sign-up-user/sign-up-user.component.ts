import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user'
import { enviroment } from 'src/environments/environments';
import { Router, UrlTree } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.scss']
})
export class SignUpUserComponent implements OnInit {

displayedColumns: string[] = ['nome', 'cognome', 'email','password'];
  data : any ;
  form !: FormGroup
  response: any;


  constructor(
    private formbuilder: FormBuilder,
    private httpclient : HttpClient,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {

  }


  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formbuilder.group({
      nome: ['',Validators.required],
      cognome: ['', Validators.required],
      email : ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
    })
  }

  button() {
    const nome = this.form.value.nome;
    const cognome = this.form.value.cognome;
    const email = this.form.value.email;
    const password = this.form.value.password;
    const repassword = this.form.value.password;




    this.httpclient.post(`${enviroment.baseUrl}/user/registrazione`,{
      nome:nome, 
       cognome:cognome,
       email: email,
       password:password
      }
       ).subscribe(
      response =>{
        this.data = response;
        if (this.data.status==200){
          console.log(this.data.status)
          console.log(this.data.messaggio)
          
        }

      }, err => {
        this.data = err;
        if (this.data.status==401){
          console.log(this.data.status)
          console.log(this.data.messaggio)
          
        }
      }

    )
    console.log('funzia')
}

onSubmit() {
  const email = this.form.value.email;
  const password = this.form.value.password;
  this.httpclient.post(`${enviroment.baseUrl}/user/logIn`, { email: email, password: password }).subscribe(
    response => {
      this.response = response;
      if (this.response.status == 200) {
        const userLogged = new User(this.response.data.id, this.response.data.nome, this.response.data.cognome, this.response.data.email);
        this.userService.setUser(userLogged);
        this.authService.saveToken(this.response.accessToken, this.response.refreshToken);
        alert("Login successful");
        this.router.navigate(['dash/user']);
      } else {
        alert("Password or email not correct.");
      }
    }, err => {
      alert('Password or email not correct.');
    }
  );
}


}



