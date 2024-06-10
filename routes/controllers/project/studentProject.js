import connectionDB from "../../../db.connection/databaseConnection.js";
import tokenFunctions from "../../../authentication/JWT/userTokens.js"




const submitProject = async(req,res) => {


    

    try{

        let userLogedin 
        const {projectTitle, projectDescription} = req.body


        const token = req.headers.authorization
            if(!token){
                return res.status(401).json({message:"Token not found"})
            }
            userCredetial
            /**
             * geting user credentials
             */
        try{

            userLogedin  = await tokenFunctions.userCredentials(token)
            
        }catch(error){
            return res.status(404).json({message:"Failured to get user ID"})
        }

        /**
         * Inserting Student Project into Student_project table
         */

        const projectQuery = "INSERT INTO Student_project (sp_title, sp_description, sp_status, sp_application_date, sa_id) VALUES (?, ?, ?, ?, ?)"

        const date = new Date()

        const projectData = [projectTitle, projectDescription, "Pending", date, userLogedin.id]

        connectionDB.query(projectQuery,projectData,(error,result)=>{
            if(error){
                return res.status(501).json({message:"Project not submited", status:"Failure", error:error})
            }else{
                res.status(200).json({message:"Project recorded", status:"Success", data:result})
            }
        })

    }catch(error){
        return res.status(500).json({message:"Internal server error", error: error})
    }
}


export default {submitProject}