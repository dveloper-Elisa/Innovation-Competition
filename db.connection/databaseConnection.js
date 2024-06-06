import mysql from "mysql"



        const connectionDB = mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"",
            database:"rpapp_d"
        })
    
        connectionDB.connect(error =>{
            if(error){
                console.log(error.message)
            }
            else{
                console.log("database connected")
            }
        })
        
       

export default connectionDB;