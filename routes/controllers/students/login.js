import encryptedPassword from "../../../authentication/encryptPassord/hashingPassword.js"
import bcrypt from "bcrypt"
import connectionDB from "../../../db.connection/databaseConnection.js"
import tokenFunctions from "../../../authentication/JWT/userTokens.js"



const studentLoginFunction = async (req,res)=>{

    try{

        const {username, password} = req.body
        const sqlQuery = "SELECT * FROM Student_account WHERE sa_username = ?"
        connectionDB.query(sqlQuery,[username],async (error,found)=>{
            if(error){
                return res.status(306).json({message:"Query Error", title:error.message})
            }
            if(found.length === 0){
                return res.status(404).json({message:"User not found", title:"Not found"})
            }
            if(found.length > 0){

                /**
                 * If username found, compare the exist password with the database's password
                 * 
                 */
                const DBpassword = found[0].sa_password
                const matchPassword = await bcrypt.compare(password, DBpassword)

                if(matchPassword){
                    return res.status(200).json({message:"Login success fully", title:"Success", student:found,token:tokenFunctions.generateToken({username, password,id:found[0].sa_id})})
                }else{
                    return res.status(404).json({message:"Incorrect user Name or Password"})
                }
            }else{
                return res.send("nothing else found")
            }
        })

    }catch(error){
        return res.status(500).json({message:"Internal server error", title:"Server is down",error:error.message})
    }
}


export default studentLoginFunction