import Category from "../models/categories.js";

export const categoriesService = {
  getAll: (options) => {
    try {
      return Category.find({ ...options }).sort({ createdAt: -1 });
    } catch (error) {
      return error;
    }
  },
  getOne: (options) => {
    try {
      return Category.findOne({ ...options });
    } catch (error) {
      return error;
    }
  },
  store: (newCategory) => {
    try {
      return Category.create(newCategory);
    } catch (error) {
      return error;
    }
  },
  delete: (id) => {
    try {
      return Category.deleteOne({ _id: id });
    } catch (error) {
      return error;
    }
  },
  update: async (id, newCategoryData) => {
    try {
      const category = await Category.findOne({ _id: id });
      category.name = newCategoryData?.name;

      return await category.save();
    } catch (error) {
      return error;
    }
  },
};
