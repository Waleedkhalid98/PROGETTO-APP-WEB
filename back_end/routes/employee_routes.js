module.exports= app=>{
    const employeeController = require("../controller/employee_controller");
    var router = require ("express").Router();

    router.post("/creazioneEmp",employeeController.creazioneEmp);
    router.post("/logIn",employeeController.logIn);
    router.post("/logOut",employeeController.logOut);


    app.use('/api/employee', router) ;
}