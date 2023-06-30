module.exports= app=>{
    const card_controller = require("../controller/card_controller");
    var router = require ("express").Router();

    
    router.post('/createCardEmp',card_controller.creaCartaEmp);
    router.post('/rimuoviCarta',card_controller.rimuoviCarta);
    router.get('/prendiCarte',card_controller.prendiCarte);
    router.post('/aggiungiPunti',card_controller.aggiungiPunti);
    router.post('/rimuoviPunti',card_controller.rimuoviPunti);
    router.get('/prendiCarta/:id',card_controller.prendiCartaIdUtente);


    



 
  app.use('/api/card', router) ;
}
