
const { request, response } = require('express')
const dbconnection= require('../config/dbconnection')
const Gift = require('../models/gift')

//METODO PER CREARE REGALI
exports.creaPremi= (request,response)=> {
    
    const nomeRegalo= request.body.nomeRegalo
    const descrizione= request.body.descrizione
    const numeroPunti  = request.body.numeroPunti

    if ( nomeRegalo == '' || descrizione == ''|| numeroPunti=='' ) {
        response.status(401).send({
            status: 401,
            messaggio: 'dati assenti'
        })

    }

    const gift={
        
        nomeRegalo:nomeRegalo,
        descrizione:descrizione,
        
        numeroPunti:numeroPunti

    }

    Gift.create(gift).then(data => {
        response.status(201).send({
            status: 201,
            message: `regalo creato con successo`
        })
    }).catch(err => {
        response.status(500).send({
            status: 500,
            message: `errore creazione regalo`,
        });
    });



}

//METODO PER VISUALIZZARE TUTTI I REGALI
exports.prendiPremi = (request, response) => {

    Gift.findAll().then(risultato => {
        if (risultato) {
            response.status(200).send({
                message: "premi trovatI",
                risultato,
                status: 200
            })
        } else {
            response.status(404).send({
                message: " premi non trovati",
                status: 404
            })
        }



    })
}

//METODO PER ELMINARE I PREMI 
exports.eliminaPremi =(request, response)=>{

    if (request.body.nomeRegalo == "" ) {
        response.status(400).send({
            message: "dati assenti",
            status: 400
        })
    }

    const nomeRegalo = request.body.nomeRegalo
   
    Gift.destroy({
        where: {
            nomeRegalo: nomeRegalo,
            
        }
    }).then(risultato => {
        console.log("sono dentro al then")
        if (risultato ) {
            console.log("sono dentro al if")

            response.status(200).send({
                messagge: "regalo eliminato",
                status: 200
            })
        } else {
            console.log("sono dentro al secondo if")

            response.status(404).send({
                message: "errore elimina regalo",
                status: 404
            })
        }


    })


}

exports.modificaPremio = (request, response) => {
    const idPremio = request.params.id;
  
    const nomeRegalo = request.body.nomeRegalo;
    const descrizione = request.body.descrizione;
    const numeroPunti = request.body.numeroPunti;
  
    if (nomeRegalo === '' || descrizione === '' || numeroPunti === '') {
      response.status(401).send({
        status: 401,
        messaggio: 'dati assenti',
      });
      
    }
  
    const updatedGift = {
      nomeRegalo: nomeRegalo,
      descrizione: descrizione,
      numeroPunti: numeroPunti,
    };
  
    Gift.findByPk(idPremio)
      .then((gift) => {
        if (!gift) {
          response.status(404).send({
            status: 404,
            message: 'Premio non trovato',
          });
         
        }else{
        
        return gift.update(updatedGift);}
      })
      .then(() => {
        response.status(200).send({
          status: 200,
          message: 'Premio modificato con successo',
        });
      })
      .catch((err) => {
        response.status(500).send({
          status: 500,
          message: 'Errore nella modifica del premio',
        });
      });
  };
  




