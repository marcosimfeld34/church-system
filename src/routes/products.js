import { Router } from "express";

import productsController from "../controllers/products.js";

import verifyToken from "../middlewares/validate-token.js";

const productsRouter = Router();

// GET - http://localhost:3000/api/v1/products/
productsRouter.get("/", verifyToken, productsController.getAll);

// GET - http://localhost:3000/api/v1/products/:id
productsRouter.get("/:id", verifyToken, productsController.getOne);

// POST - http://localhost:3000/api/v1/products/
productsRouter.post("/", verifyToken, productsController.store);

// PUT - http://localhost:3000/api/v1/products/:id
productsRouter.put("/:id", verifyToken, productsController.update);

// PUT - http://localhost:3000/api/v1/products/
productsRouter.put("/", verifyToken, productsController.updateMany);

// DELETE - http://localhost:3000/api/v1/products/:id
productsRouter.delete("/:id", verifyToken, productsController.delete);

export default productsRouter;
