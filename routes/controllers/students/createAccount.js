import connectionDB from "../../../db.connection/databaseConnection.js";
import hashingPasswordFX from "../../../authentication/encryptPassord/hashingPassword.js";

/**
 * Create account
 *  */ 
const studentCreateAccount = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPWD = await hashingPasswordFX.hashPassword(password)

    const st_id = "SELECT st_id FROM Student_table WHERE st_regno = ?";
    connectionDB.query(st_id, [username], async (error, result) => {
      if (error) {
        return res
          .status(400)
          .json({ message: "Error in Quert", error: error.message });
      } else if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "Student not found", title: "not found" });
      } else if(result.length > 0){
        return res.status(409).json({message:"You already have account plsease login", title:"Already have account"})
      }
      
      else {
        const st_id = result[0].st_id;

        const sqlQuery =
          "INSERT INTO Student_account (sa_username, sa_password, st_id) VALUES (?, ?, ?)";
        connectionDB.query(
          sqlQuery,
          [username,hashedPWD, st_id],
          (error, result) => {
            if (error) {
              return res
                .status(400)
                .json({ message: "Error in Quert", error: error.message });
            } else {
              return res
                .status(200)
                .json({
                  message: "Student Account created success fully",
                  title: "Success",
                  user:result
                });
            }
          }
        );
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal sever error", error: error.message });
  }
};

export default { studentCreateAccount };
