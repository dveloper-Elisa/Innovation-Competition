import connectionDB from "../../../db.connection/databaseConnection.js";
import tokenFunctions from "../../../authentication/JWT/userTokens.js";

const updateProject = async (req, res) => {
  try {
    const { projectTitle, projectDescription } = req.body;
    const { projectID } = req.params;


    let logedIn;

    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized", status: "Token empty" });
    } else {
      try {
        logedIn = await tokenFunctions.userCredentials(token);
      } catch (error) {
        return res
          .status(400)
          .json({ message: "User credentials not retrieved" });
      }
    }

    /**
     * check if project exist
     */

    const projectExist = "SELECT * FROM Student_project WHERE sp_id = ?";

    connectionDB.query(projectExist, [projectID], (error, result) => {
      if (error) {
        return res
          .status(400)
          .json({
            message: "The error in query for searching project",
            error: error,
          });
      } else if (result.length > 0) {
        /**
         * Sql update
         */

        const sqlUpdate =
          "UPDATE Student_project SET sp_title = ? , sp_description = ? WHERE sp_id = ?";
        connectionDB.query(
          sqlUpdate,
          [projectTitle, projectDescription, projectID],
          (error, result) => {
            if (error) {
              return res
                .status(400)
                .json({
                  message: "The error occured in making query",
                  error: error,
                });
            }else
            return res
              .status(200)
              .json({
                messgae: "Project updated success full",
                status: "Success",
                data: result,
                viewer:logedIn
              });
          }
        );
      }
else
      return res.status(404).json({message:"project not found", status:"Failure"})
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export default { updateProject };
