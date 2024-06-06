import connectionDB from "../../db.connection/databaseConnection.js";
import bcrypt from "bcrypt"



const hashPassword = async (password) =>{
    try{

        const hashedPassword = await bcrypt.hash(password,10);
        return hashedPassword

    }catch(error){
        return error.message
    }
}


const comparePasswords = async (req,res)=>{
    try{

        const {username, password} = req.body
        const sqlQuery = "SELECT * FROM Student_account WHERE sa_username = ?"
        connectionDB.query(sqlQuery,[username],async (error,found)=>{
            if(error){
                return res.status(306).json({message:"Query Error", title:error.message})
            }else if(found.length === 0){
                return res.status(404).json({message:"User not found", title:"Not found"})
            }else if(found.length > 0){
                const DBpassword = found[0].sa_password

                const matchPassword = await bcrypt.compare(password, DBpassword)

                if(matchPassword){
                    return res.status(200).json({message:"Login success fully", title:"Success", student:found})
                }else{
                    return res.status(400).json({message:"Incorrect user Name or Password"})
                }
            }else{
                return res.send("nothing else found")
            }
        })

    }catch(error){
        return res.status(500).json({message:"Internal server error", title:"Server is down"})
    }
}



export default {hashPassword,comparePasswords}