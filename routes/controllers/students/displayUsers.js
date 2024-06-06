import connectionDB from "../../../db.connection/databaseConnection.js";
import tokenFunctions from "../../../authentication/JWT/userTokens.js";

const getAllStudents = async (req, res) => {
    try {
        const token = req.headers.authorization;
        let userCredentialsResult;

        // Ensure the token exists
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access", status: "Not authorized" });
        }

        // Invoke userCredentials function with the token
        try {
            userCredentialsResult = await tokenFunctions.userCredentials(token);
        } catch (error) {
            return res.status(500).json({ message: "Failed to get user credentials", error: error.message });
        }

        // Proceed with the database query
        connectionDB.query("SELECT * FROM Student_table", (error, result) => {
            if (error) {
                return res.status(400).json({ message: "Failure", error: error.message });
            } else {
                return res.status(200).json({ message: "Success", users: result, viewer: userCredentialsResult });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};

export default { getAllStudents };
