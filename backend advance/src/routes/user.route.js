import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshUserToken } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/register",
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser);

userRouter.route("/login").post(loginUser)

//secuere route
userRouter.route("/logout").post(verifyJWT, logoutUser)
userRouter.route("/refreshtoken").post(refreshUserToken)



export { userRouter };
