import { Router } from "express";

import debtController from "../controllers/debts.js";

import verifyToken from "../middlewares/validate-token.js";

const debtsRouter = Router();

// GET - http://localhost:3000/api/v1/debts/
debtsRouter.get("/", verifyToken, debtController.getAll);

// GET - http://localhost:3000/api/v1/debts/:id
debtsRouter.get("/:id", verifyToken, debtController.getOne);

// POST - http://localhost:3000/api/v1/debts/
debtsRouter.post("/", verifyToken, debtController.store);

// PUT - http://localhost:3000/api/v1/debts/:id
debtsRouter.put("/:id", verifyToken, debtController.update);

// DELETE - http://localhost:3000/api/v1/debts/:id
debtsRouter.delete("/:id", verifyToken, debtController.delete);

export default debtsRouter;
