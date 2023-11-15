import { Router } from "express";

import saleDetailsController from "../controllers/saleDetails.js";

import verifyToken from "../middlewares/validate-token.js";

const saleDetailsRouter = Router();

// GET - http://localhost:3000/api/v1/saleDetails/
saleDetailsRouter.get("/", verifyToken, saleDetailsController.getAll);

// GET - http://localhost:3000/api/v1/saleDetails/:id
saleDetailsRouter.get("/:id", verifyToken, saleDetailsController.getOne);

// POST - http://localhost:3000/api/v1/saleDetails/
// saleDetailsRouter.post("/", verifyToken, saleDetailsController.store);

// POST - http://localhost:3000/api/v1/saleDetails/
saleDetailsRouter.post("/", verifyToken, saleDetailsController.storeMany);

// PUT - http://localhost:3000/api/v1/saleDetails/
saleDetailsRouter.put("/", verifyToken, saleDetailsController.updateMany);

// DELETE - http://localhost:3000/api/v1/saleDetails/:id
saleDetailsRouter.delete("/:id", verifyToken, saleDetailsController.delete);

// DELETE - http://localhost:3000/api/v1/saleDetails
saleDetailsRouter.put(
  "/deleteMany",
  verifyToken,
  saleDetailsController.deleteMany
);

export default saleDetailsRouter;
