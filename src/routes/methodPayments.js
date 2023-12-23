import { Router } from "express";

import methodPaymentController from "../controllers/methodPayments.js";

import verifyToken from "../middlewares/validate-token.js";

const methodPaymentRouter = Router();

// GET - http://localhost:3000/api/v1/methodPayments/
methodPaymentRouter.get("/", verifyToken, methodPaymentController.getAll);

// GET - http://localhost:3000/api/v1/methodPayments/:id
methodPaymentRouter.get("/:id", verifyToken, methodPaymentController.getOne);

// POST - http://localhost:3000/api/v1/methodPayments/
methodPaymentRouter.post("/", verifyToken, methodPaymentController.store);

// PUT - http://localhost:3000/api/v1/methodPayments/:id
methodPaymentRouter.put("/:id", verifyToken, methodPaymentController.update);

// DELETE - http://localhost:3000/api/v1/methodPayments/:id
methodPaymentRouter.delete("/:id", verifyToken, methodPaymentController.delete);

export default methodPaymentRouter;
