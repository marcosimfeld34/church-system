import { categoriesService } from "../services/categories.js";
import { MISSING_FIELDS_REQUIRED, NOT_FOUND } from "../labels/labels.js";

const categoriesController = {
  getAll: async (req, res) => {
    // const createdBy = req.user.id;

    const { id } = req.query;

    const filters = {
      $expr: {
        $and: [{ $eq: ["$isDeleted", false] }],
        $and: [{ $eq: ["$_id", id] }],
      },
    };

    const categories = await categoriesService.getAll(id ? filters : {});

    return res.status(200).json({
      status: 200,
      total: categories.length,
      data: categories,
    });
  },
  getOne: async (req, res) => {
    const { id } = req.params;

    const category = await categoriesService.getOne({ _id: id });

    if (!category) {
      return res.status(404).json({
        status: 404,
        message: NOT_FOUND,
      });
    }

    return res.status(200).json({
      status: 200,
      data: category,
    });
  },
  store: async (req, res) => {
    if (!req.body.name) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: MISSING_FIELDS_REQUIRED,
      });
    }

    const categoryToStore = { ...req.body };
    categoryToStore.createdBy = req.user.id;
    categoryToStore.updatedBy = req.user.id;

    const categoryStored = await categoriesService.store(categoryToStore);

    return res.status(201).json({
      status: 201,
      isStored: true,
      data: categoryStored,
    });
  },
  delete: async (req, res) => {
    const { id } = req.params;

    const categoryDeleted = await categoriesService.delete(id);

    if (!categoryDeleted) {
      return res.status(404).json({
        status: 404,
        isDeleted: false,
        message: NOT_FOUND,
      });
    }

    return res.status(200).json({
      status: 200,
      isDeleted: true,
      data: categoryDeleted,
    });
  },
  update: async (req, res) => {
    if (!req.body.name) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: MISSING_FIELDS_REQUIRED,
      });
    }

    const { id } = req.params;

    const oldCategory = await categoriesService.getOne({ _id: id });

    if (!oldCategory) {
      return res.status(404).json({
        status: 404,
        isUpdated: false,
        message: NOT_FOUND,
      });
    }

    const newCategoryData = { ...oldCategory._doc, ...req.body };

    const categoriesUpdated = await categoriesService.update(
      id,
      newCategoryData
    );

    return res.status(200).json({
      status: 200,
      isUpdated: true,
      data: categoriesUpdated,
    });
  },
};

export default categoriesController;
