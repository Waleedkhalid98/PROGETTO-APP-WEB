import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/environments/environments.prod';
import { Employee } from 'src/app/models/employee';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {

  //variabili
  TabUser: User[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cognome', 'email'];

  userType: User | Employee | undefined;

  isEmployee: boolean | undefined;

  user: User | undefined

  data: any;
  isUser: any
  form !: FormGroup

  //condizioni div iniziali
  mostraCarta = true
  creaUtente = false
  eliminaUtente = false

  //costruttore
  constructor(
    private formbuilder: FormBuilder,
    private httpclient: HttpClient,
    private userService: UserService,
  ) {

  }


  // metodi per cambiare le condizioni dei div 
  mostraUtenti() {
    this.mostraCarta = true
    this.creaUtente = false
    this.eliminaUtente = false

  }
  creaUtenti() {
    this.creaUtente = true
    this.mostraCarta = false
    this.eliminaUtente = false


  }
  eliminaUtenti() {
    this.eliminaUtente = true
    this.creaUtente = false
    this.mostraCarta = false

  }

  //metodo ngInit
  ngOnInit(): void {

    this.initForm();
    this.userType = this.userService.getUser();
    if (this.userType instanceof Employee) {
      this.isEmployee = true;
      this.fetchData();


    } else if (this.userType instanceof User) {
      this.isEmployee = false;
      this.prendiDati();
    }

  }


  //initForm
  initForm() {
    this.form = this.formbuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
    })

  }

  //metodo che permette all'utente di visualizzare i suoi dati
  prendiDati() {
    if (this.userType instanceof User) {
      const token = localStorage.getItem('accessToken');
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
      };
      console.log(this.userType.id)
      this.httpclient.get(`${enviroment.baseUrl}/user/prendiDatiUtente/${this.userType.id}`, httpOptions).subscribe(
        response => {
          this.data = response;
          if (this.data.status == 200) {

            this.user = this.data.data

          }
        }
      )
    }

  }

  //metodo che permette all'employee di vedere la lista di utenti
  fetchData() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    this.httpclient.get<any>(`${enviroment.baseUrl}/user/prendiUtenti`, httpOptions).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          console.log(response)
          if (Array.isArray(this.data.risultato)) {
            this.TabUser = this.data.risultato;
            console.log(this.data);
            console.log(this.TabUser);
          } else {
            console.error('I dati ricevuti non sono un array.');
          }
        }
      },
      error => {
        console.error('Errore durante la richiesta HTTP:', error);
      }
    );
  }

  //metodo che permette all'employee di creare un cliente nuovo
  button() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    const nome = this.form.value.nome;
    const cognome = this.form.value.cognome;
    const email = this.form.value.email;
    const password = this.form.value.password;
    const repassword = this.form.value.password;



    if (password != repassword) {
      alert("password non coincidono")
      return
    }
    this.httpclient.post(`${enviroment.baseUrl}/user/creaUser`, {
      nome: nome,
      cognome: cognome,
      email: email,
      password: password
    }, httpOptions
    ).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          alert("account creato con successo")
          this.fetchData()
          this.mostraUtenti()
          console.log(this.data.status)
          console.log(this.data.messaggio)
          this.resetData()

        }

      }, err => {
        this.data = err;
        if (this.data.status == 401) {
          console.log(this.data.status)
          console.log(this.data.messaggio)
          this.resetData()

        }
      }

    )

  }

  //metodo che permette all'employee di eliminare un utente
  buttondelete() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    const nome = this.form.value.nome;
    const email = this.form.value.email;

    this.httpclient.post(`${enviroment.baseUrl}/user/rimuoviUtenti`, {
      nome: nome,
      email: email

    }, httpOptions
    ).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          alert("utente eliminato con successo")
          console.log(this.data.status)
          console.log(this.data.messaggio)
          this.fetchData()
          this.mostraUtenti()
          this.resetData()

        }

      }, err => {
        this.data = err;
        if (this.data.status == 401) {
          console.log(this.data.status)
          console.log(this.data.messaggio)

        }
      }

    )
    console.log('funzia')
  }





  //resetta la form 
  resetData() {
    this.form.reset()
    this.data = null
  }





}
