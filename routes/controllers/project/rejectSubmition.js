import connectionDB from "../../../db.connection/databaseConnection.js";
import tokenFunctions from "../../../authentication/JWT/userTokens.js"


const rejectApplcation = (req, res)=>{
    try{

        const {projectID} = req.params


        /**
         * check if project exist
         */
        const sql = "SELECT * FROM Student_project WHERE sp_id = ?"
        const rejectQuery = "UPDATE Student_project SET sp_status = ? WHERE sp_id= ?"

        connectionDB.query(sql,[projectID],(error,result)=>{
            if(!error){
                if(result.length > 0){
                    connectionDB.query(rejectQuery,["Rejected", projectID],(error)=>{
                        if(!error){
                            return res.status(200).json({messge:"Project successfull Conceled", status:"Success"})
                        }
                        else return res.status(400).json({message:"Error in query", error})
                    })
                }
                else return res.status(404).json({message:"Project not found", result})
            }else return res.status(400).json({message:"Error in Select query", error})
        })


    }catch(error){
        return res.status(500).json({message:"Internal server erroe", error: error.message})
    }
}


export default {rejectApplcation}