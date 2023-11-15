import { Router } from "express";

import clientController from "../controllers/clients.js";

import verifyToken from "../middlewares/validate-token.js";

const clientsRouter = Router();

// GET - http://localhost:3000/api/v1/clients/
clientsRouter.get("/", verifyToken, clientController.getAll);

// GET - http://localhost:3000/api/v1/clients/:id
clientsRouter.get("/:id", verifyToken, clientController.getOne);

// POST - http://localhost:3000/api/v1/clients/
clientsRouter.post("/", verifyToken, clientController.store);

// PUT - http://localhost:3000/api/v1/clients/:id
clientsRouter.put("/:id", verifyToken, clientController.update);

// DELETE - http://localhost:3000/api/v1/clients/:id
clientsRouter.delete("/:id", verifyToken, clientController.delete);

export default clientsRouter;
