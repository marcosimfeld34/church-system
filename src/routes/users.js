import { Router } from "express";

import usersController from "../controllers/users.js";

import verifyToken from "../middlewares/validate-token.js";

const usersRouter = Router();

usersRouter.get("/", verifyToken, usersController.getAll);
usersRouter.post("/login", usersController.login);
usersRouter.get("/logout", usersController.logout);
usersRouter.get("/refresh", usersController.refreshToken);
usersRouter.post("/register", usersController.store);
// usersRouter.put("/recovery-password", usersController.recoverPassword);
usersRouter.put("/new-password", usersController.newPassword);

export default usersRouter;
