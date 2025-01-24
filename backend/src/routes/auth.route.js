import express from 'express'
import {login,logout,signup} from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";
import {checkAuth} from "../controllers/auth.controller.js";
import {updateProfile} from "../controllers/auth.controller.js";

console.log("In auth route");
const router=express.Router();

router.post("/signup", signup)
router.post("/login",login)
router.post("/logout",logout)
//protectRoute is a middlleware
router.put("/update-profile",protectRoute,updateProfile)
router.get("/check",protectRoute,checkAuth)

export default router;