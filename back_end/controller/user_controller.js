const dbconnection = require('../config/dbconnection')
const User = require('../models/user')
const Card = require('../models/card')
const jwt = require('../jwt/controllerJwt')




const bcrypt = require("bcrypt")
const secret = "xxjjkk123!!à"

//METODO PER CREARE UTENTI 
exports.registrazione = async (requeste, response) => {
    if (requeste.body.nome == "" || requeste.body.cognome == "" || requeste.body.email == "" || requeste.body.password == "") {
        response.status(400).send({
            messaggio: "dati assenti",
            status: 400,


        })
    }
    const nome = requeste.body.nome;
    const cognome = requeste.body.cognome;
    const email = requeste.body.email;
    const password = requeste.body.password + secret;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    console.log(password)
    console.log(hashPassword)

    user = {
        nome: nome,
        cognome: cognome,
        email: email,
        password: hashPassword,
        salt: salt,

    }
    User.create(user).then(data => {
        response.status(201).send({
            status: 201,
            message: `utente creato con successo`
        })
    }).catch(err => {
        response.status(500).send({
            status: 500,
            message: `errore creazione utente`,
        });


    })

}

//METODO PER CREARE UTENTI TRAMITE EMPLOYEE
exports.creaUser = async (requeste, response) => {
    if (requeste.body.nome == "" || requeste.body.cognome == "" || requeste.body.email == "" || requeste.body.password == "") {
        response.status(400).send({
            messaggio: "dati assenti",
            status: 400,


        })
    }
    const nome = requeste.body.nome;
    const cognome = requeste.body.cognome;
    const email = requeste.body.email;
    const password = requeste.body.password + secret;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    console.log(password)
    console.log(hashPassword)

    user = {
        nome: nome,
        cognome: cognome,
        email: email,
        password: hashPassword,
        salt: salt,

    }
    User.create(user).then(data => {
        response.status(201).send({
            status: 201,
            message: `utente creato con successo`
        })
    }).catch(err => {
        response.status(500).send({
            status: 500,
            message: `errore creazione utente`,
        });


    })

}

//METODO PER RIMUOVERE UTENTI
exports.rimuoviUtenti = (request, response) => {
    if (request.body.nome == "" || request.body.email == "") {
        response.status(400).send({
            message: "dati assenti",
            status: 400
        })
    }

    const nome = request.body.nome
    const email = request.body.email

    User.destroy({
        where: {
            nome: nome,
            email: email
        }
    }).then(risultato => {
        if (risultato == 1) {
            response.status(200).send({
                messagge: "utente eliminato ",
                status: 200
            })
        } else {
            response.status(404).send({
                message: "errore elimina utente ",
                status: 404
            })
        }



    })


}

//METODO PER VISUALIZZARE TUTTI GLI UTENTI
exports.prendiUtenti = (request, response) => {

    User.findAll({
        attributes: [

            "id",
            "nome",
            "cognome",
            "email",

        ]
    }).then(risultato => {
        if (risultato) {
            response.status(200).send({
                message: "utenti trovati",
                risultato,
                status: 200
            })
        } else {
            response.status(404).send({
                message: " utenti non trovati",
                status: 404
            })
        }



    })
}

//METODO LOGIN USER 
exports.logIn = async (request, response) => {
    if (request.body.email == "" || request.body.password == "") {
        response.status(400).send({
            message: "dati assenti",
            status: 400
        })
    }
    const email= request.body.email
    const password= request.body.password
    
    const newPassword=password+secret

    User.findOne({
        where : {
            email: email
        }
    }).then((user)=>{
        if(!user){
            response.status(400).send({
                message: "user non trovato",
                status : 400
            })
        }else{
            return bcrypt.compare(newPassword,user.password).then((risultato)=>{
                if(!risultato){
                    response.status(404).send({
                        message: "password non corretta",
                        status : 404
                    })
                }else {
                    const accessToken = jwt.accessToken(user)
                    console.log(accessToken)
                    const refreshToken = jwt.getRefreshToken(user)
                    jwt.addToken(refreshToken)
                    const data = {
                        id: user.id,
                        nome: user.nome,
                        cognome : user.cognome,
                        email : user.email,
                    }
                    response.status(200).send({
                        status :200,
                        data,
                        accessToken:accessToken,
                        refreshToken: refreshToken,
                    })
                }
                
                    
                

            })
        }
    })
}

//METODO refresh 
exports.refreshToken = async (req, res) => {
    let refreshToken = req.body.refreshToken;
  
    if (!refreshToken || !jwt.containsToken(refreshToken)) {
      return res.status(401).send({
        status: 401,
        message: "You are not authenticated.",
      });
    }
  
    let user = jwt.getUserByRefreshToken(refreshToken);
  
    jwt.refreshTokens = jwt.refreshTokens.filter(token => token !== refreshToken);
  
    let newAccessToken = jwt.accessToken(user);
    let newRefreshToken = jwt.getRefreshToken(user);
    jwt.refreshTokens.push(newRefreshToken);
    console.log("Nuovi Token : " + "\nAccessToken : " + newAccessToken + "\nRefreshToken : " + newRefreshToken);
    console.log(jwt.refreshTokens);
  
    return res.status(200).send({
      status: 200,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  }

  //logout
  exports.logOut = async (req, res) => {
    let refreshToken = req.body.refreshToken;
  
    if (!refreshToken) {
      res.status(400).send({
        status: 400,
        message: "Content can't be empty!"
      });
      return;
    }
  
    let index = jwt.refreshTokens.indexOf(refreshToken);
  
    if (index == -1) {
      res.status(401).send({
        status: 401,
        message: "You are not authenticated.",
      });
    }
  
    jwt.refreshTokens.splice(index, 1);
    console.log(jwt.refreshTokens);
  
    res.status(200).send({
      status: 200,
      message: "Logout Successfull.",
    });
  }





