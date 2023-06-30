module.exports= app=>{
    const userController = require("../controller/user_controller");
    var router = require ("express").Router();

    router.post("/registrazione",userController.registrazione);
    router.post("/creaUser",userController.creaUser);
    router.post("/rimuoviUtenti",userController.rimuoviUtenti);
    router.get("/prendiUtenti",userController.prendiUtenti);
    router.post("/logIn",userController.logIn);
    router.post("/logOut",userController.logOut);
    router.post("/refreshToken",userController.refreshToken);



    
  
 
    app.use("/api/user", router)
}