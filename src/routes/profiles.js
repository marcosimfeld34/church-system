import { Router } from "express";

import profileController from "../controllers/profiles.js";

import verifyToken from "../middlewares/validate-token.js";

const profilesRouter = Router();

// GET - http://localhost:3000/api/v1/profiles/
profilesRouter.get("/", verifyToken, profileController.getAll);

// GET - http://localhost:3000/api/v1/profiles/:id
profilesRouter.get("/:id", verifyToken, profileController.getOne);

// GET - http://localhost:3000/api/v1/profiles/:name
profilesRouter.get(
  "/developerName/:name",
  verifyToken,
  profileController.getOneByDeveloperName
);

// POST - http://localhost:3000/api/v1/profiles/
profilesRouter.post("/", verifyToken, profileController.store);

// PUT - http://localhost:3000/api/v1/profiles/:id
profilesRouter.put("/:id", verifyToken, profileController.update);

// DELETE - http://localhost:3000/api/v1/profiles/:id
profilesRouter.delete("/:id", verifyToken, profileController.delete);

export default profilesRouter;
