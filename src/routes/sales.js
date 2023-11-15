import { Router } from "express";

import salesController from "../controllers/sales.js";

import verifyToken from "../middlewares/validate-token.js";

const salesRouter = Router();

// GET - http://localhost:3000/api/v1/sales/
salesRouter.get("/", verifyToken, salesController.getAll);

// GET - http://localhost:3000/api/v1/sales/:id
salesRouter.get("/:id", verifyToken, salesController.getOne);

// POST - http://localhost:3000/api/v1/sales/
salesRouter.post("/", verifyToken, salesController.store);

// PUT - http://localhost:3000/api/v1/sales/:id
salesRouter.put("/:id", verifyToken, salesController.update);

// DELETE - http://localhost:3000/api/v1/sales/:id
salesRouter.delete("/:id", verifyToken, salesController.delete);

export default salesRouter;
