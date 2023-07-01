import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/environments/environments.prod';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card';
import { Employee } from 'src/app/models/employee';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  userType: User | Employee | undefined;
  isEmployee: boolean | undefined;

  card: Card | undefined
  isUser: any
  data: any
  MostraCreaCarta = true
  mostraEliminaCarta = false
  mostraSottraiCarta = false
  mostraAggiungiCarta = false
  mostraVisualizzaCarta = false
  possiediCarta=false
  carteUtenti: Card[] = []



  form !: FormGroup
  secondoForm !: FormGroup;
  terzoForm !: FormGroup;
  quartoForm !: FormGroup;


  constructor(
    private formbuilder: FormBuilder,
    private httpclient: HttpClient,
    private router: Router,
    private userService: UserService,
  ) {

  }


  creaCarte() {
    this.MostraCreaCarta = true
    this.mostraSottraiCarta = false
    this.mostraAggiungiCarta = false
    this.mostraVisualizzaCarta = false
    this.mostraEliminaCarta = false


  }

  mostraEliminaCarte() {
    this.mostraEliminaCarta = true
    this.mostraAggiungiCarta = false
    this.mostraSottraiCarta = false
    this.MostraCreaCarta = false
    this.mostraVisualizzaCarta = false


  }
  mostraAggiungiCarte() {
    this.mostraAggiungiCarta = true
    this.mostraSottraiCarta = false
    this.MostraCreaCarta = false
    this.mostraVisualizzaCarta = false
    this.mostraEliminaCarta = false



  }

  mostraSottraiCarte() {
    this.mostraSottraiCarta = true
    this.MostraCreaCarta = false
    this.mostraAggiungiCarta = false
    this.mostraVisualizzaCarta = false
    this.mostraEliminaCarta = false



  }
  mostraVisualizzaCarte() {
    this.mostraVisualizzaCarta = true
    this.MostraCreaCarta = false
    this.mostraAggiungiCarta = false
    this.mostraSottraiCarta = false
    this.mostraEliminaCarta = false


  }




  ngOnInit(): void {
    this.initForm()
    this.userType = this.userService.getUser();
    if (this.userType instanceof Employee) {
      this.isEmployee = true;
      this.fetchData();


    } else if (this.userType instanceof User) {
      this.isEmployee = false;
      this.prendiCarta()

    }
  }

  initForm() {

    this.quartoForm = this.formbuilder.group({
      id: ['', Validators.required],
    })

    this.secondoForm = this.formbuilder.group({
      codice: ['', Validators.required],
      punti: ['', Validators.required],
    })

    this.terzoForm = this.formbuilder.group({
      codice: ['', Validators.required],
      punti: ['', Validators.required],
    })

    this.form = this.formbuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      codice: ['', Validators.required],
      punti: ['', Validators.required],
      id: ['', Validators.required],
    })
  }

  //VISUALIZZA CARTE UTENTI
  fetchData() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    this.httpclient.get<any>(`${enviroment.baseUrl}/card/prendiCarte`, httpOptions).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          console.log(response)
          if (Array.isArray(this.data.risultato)) {
            this.carteUtenti = this.data.risultato;
            console.log(this.data);
            console.log(this.carteUtenti);
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

  displayedColumns: string[] = ['id', 'idUtente', 'codice', 'punti'];


  //metodo per creare carta
  button() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    const nome = this.form.value.nome;
    const cognome = this.form.value.cognome;
    const codice = this.form.value.codice;
    const punti = this.form.value.punti;




    this.httpclient.post(`${enviroment.baseUrl}/card/createCardEmp`, {
      nome: nome,
      cognome: cognome,
      codice: codice,
      punti: punti,
    }, httpOptions
    ).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 201) {
          alert("carta creata")
          console.log(this.data.status)
          console.log(this.data.messaggio)
          this.fetchData()
          this.mostraVisualizzaCarte()
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

  //elimina carta
  buttondelete() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    const id = this.quartoForm.value.id;
    console.log("dentro")
    console.log(id)

    this.httpclient.post(`${enviroment.baseUrl}/card/rimuoviCarta`, {
      id: id,
    }, httpOptions
    ).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          console.log(this.data.status)
          console.log(this.data.messaggio)
          alert("carta eliminata con successo")
          this.fetchData()
          this.mostraVisualizzaCarte()
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

  }

  //metodo per aggiungere i punti clienti
  button2() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    const codice = this.terzoForm.value.codice;
    const punti = this.terzoForm.value.punti;




    this.httpclient.post(`${enviroment.baseUrl}/card/aggiungiPunti`, {
      codice: codice,
      punti: punti,
    }, httpOptions
    ).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          alert("punti aggiunti")
          console.log(this.data.status)
          console.log(this.data.messaggio)
          this.fetchData()
          this.mostraVisualizzaCarte()
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

  //metodo per togliere i punti clienti
  button3() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    const codice = this.secondoForm.value.codice;
    const punti = this.secondoForm.value.punti;




    this.httpclient.post(`${enviroment.baseUrl}/card/rimuoviPunti`, {
      codice: codice,
      punti: punti,
    }, httpOptions
    ).subscribe(
      response => {
        this.data = response;
        if (this.data.status == 200) {
          alert("punti sottratti")
          console.log(this.data.status)
          console.log(this.data.messaggio)
          this.fetchData()
          this.mostraVisualizzaCarte()
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
  resetData() {
    this.form.reset()
    this.secondoForm.reset()
    this.terzoForm.reset()
    this.quartoForm.reset()


  }

  prendiCarta() {
    if (this.userType instanceof User) {
      const token = localStorage.getItem('accessToken');
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
      };
      console.log(this.userType.id)
      this.httpclient.get(`${enviroment.baseUrl}/card/prendiCarta/${this.userType.id}`, httpOptions).subscribe(
        response => {
          this.data = response;
          if (this.data.status == 200) {
            this.possiediCarta=true
            this.card = this.data.data

          }
        }, error => {
          this.data= error 
          if(this.data.status==402) {
            this.possiediCarta=false
          }else {
            this.possiediCarta=false
          }
        }
        

      )
    }

  }

}
