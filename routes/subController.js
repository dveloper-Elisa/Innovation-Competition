import { Router } from "express";
import displayAllUsers from "./controllers/students/displayUsers.js"
import createAccounts from "./controllers/students/createAccount.js";
import login from "./controllers/students/login.js"
import studentProject from "./controllers/project/studentProject.js";
import TokenFunctions from "../authentication/JWT/userTokens.js"


const router = Router()





router.get("/api/v1/getStudent", TokenFunctions.verifyToken,displayAllUsers.getAllStudents)

router.post("/api/v1/createaccount",createAccounts.studentCreateAccount)
router.post("/api/v1/rapply-project",studentProject.submitProject)
router.post("/api/v1/login",login)










export default router