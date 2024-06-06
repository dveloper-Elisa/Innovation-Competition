import jwt from "jsonwebtoken"


const generateToken = (users) => {
        const tokenGenerated = jwt.sign( users , process.env.TOKENSECRETKEY,{expiresIn: "2h"})
        return tokenGenerated
}


/**
 * 
 * function to return the verifiyed token
 * 
 */

const verifyToken = (req,res,next) => {
    try{
        const token = req.headers.authorization

        const decode = jwt.verify(token, process.env.TOKENSECRETKEY)

        if(decode){
            return next()
        }
        return res.status(401).json({message:"Unauthorized access",status:"Not authorized"})

    }catch(error){
        return res.status(500).json({message:"Internal server error", error:error.message, status:"Failure"})
    }

}

/**
 * 
 * function that returns the credential of loged in User
 * 
 */

const userCredentials = async (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.TOKENSECRETKEY);
        return decodedToken;
    } catch (error) {
        throw new Error("Internal server error: " + error.message);
    }
}

export default { generateToken, verifyToken, userCredentials };
