import { productsService } from "../services/products.js";
import { MISSING_FIELDS_REQUIRED, NOT_FOUND } from "../labels/labels.js";

const productsController = {
  getAll: async (req, res) => {
    // const createdBy = req.user.id;

    const products = await productsService.getAll({
      $expr: {
        $and: [{ $eq: ["$isDeleted", false] }],
      },
    });

    return res.status(200).json({
      status: 200,
      total: products.length,
      data: products,
    });
  },
  getOne: async (req, res) => {
    const { id } = req.params;

    const product = await productsService.getOne({ _id: id });

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: NOT_FOUND,
      });
    }

    return res.status(200).json({
      status: 200,
      data: product,
    });
  },
  store: async (req, res) => {
    if (
      !req.body.name ||
      !req.body.costPrice ||
      !req.body.salePrice ||
      !req.body.salePorcentage ||
      !req.body.stock ||
      !req.body.category
    ) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: MISSING_FIELDS_REQUIRED,
      });
    }

    const productToStore = { ...req.body };
    productToStore.createdBy = req.user.id;
    productToStore.updatedBy = req.user.id;

    const productStored = await productsService.store(productToStore);

    return res.status(201).json({
      status: 201,
      isStored: true,
      data: productStored,
    });
  },
  delete: async (req, res) => {
    const { id } = req.params;

    const productDeleted = await productsService.delete(id);

    if (!productDeleted) {
      return res.status(404).json({
        status: 404,
        isDeleted: false,
        message: NOT_FOUND,
      });
    }

    return res.status(200).json({
      status: 200,
      isDeleted: true,
      data: productDeleted,
    });
  },
  update: async (req, res) => {
    if (
      !req.body.name ||
      !req.body.costPrice ||
      !req.body.salePrice ||
      !req.body.salePorcentage ||
      req.body.stock === undefined ||
      !req.body.category
    ) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: MISSING_FIELDS_REQUIRED,
      });
    }

    const { id } = req.params;

    const oldProduct = await productsService.getOne({ _id: id });

    if (!oldProduct) {
      return res.status(404).json({
        status: 404,
        isUpdated: false,
        message: NOT_FOUND,
      });
    }

    const newProductData = { ...oldProduct._doc, ...req.body };

    const productsUpdated = await productsService.update(id, newProductData);

    return res.status(200).json({
      status: 200,
      isUpdated: true,
      data: productsUpdated,
    });
  },
  updateMany: async (req, res) => {
    if (!req.body.products && req.body.products.length > 0) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: MISSING_FIELDS_REQUIRED,
      });
    }

    const productsToUpdate = req.body.products.map((product) => {
      return {
        ...product,
      };
    });

    const data = await productsService.updateMany(productsToUpdate);

    return res.status(200).json({
      status: 200,
      isUpdated: true,
      data,
    });
  },
};

export default productsController;
