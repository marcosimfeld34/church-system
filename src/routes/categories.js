import { Router } from "express";

import categoryController from "../controllers/categories.js";

import verifyToken from "../middlewares/validate-token.js";

const categoriesRouter = Router();

// GET - http://localhost:3000/api/v1/categories/
categoriesRouter.get("/", verifyToken, categoryController.getAll);

// GET - http://localhost:3000/api/v1/categories/:id
categoriesRouter.get("/:id", verifyToken, categoryController.getOne);

// POST - http://localhost:3000/api/v1/categories/
categoriesRouter.post("/", verifyToken, categoryController.store);

// PUT - http://localhost:3000/api/v1/categories/:id
categoriesRouter.put("/:id", verifyToken, categoryController.update);

// DELETE - http://localhost:3000/api/v1/categories/:id
categoriesRouter.delete("/:id", verifyToken, categoryController.delete);

export default categoriesRouter;
