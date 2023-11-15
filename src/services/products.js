import Product from "../models/products.js";

export const productsService = {
  getAll: (options) => {
    try {
      return Product.find({ ...options })
        .populate("category")
        .sort({ createdAt: -1 });
    } catch (error) {
      return error;
    }
  },
  getOne: (options) => {
    try {
      return Product.findOne({ ...options }).populate("category");
    } catch (error) {
      return error;
    }
  },
  store: (newProduct) => {
    try {
      return Product.create(newProduct);
    } catch (error) {
      return error;
    }
  },
  delete: (id) => {
    try {
      return Product.deleteOne({ _id: id });
    } catch (error) {
      return error;
    }
  },
  update: async (id, newProductData) => {
    try {
      const product = await Product.findOne({ _id: id });
      product.name = newProductData?.name;
      product.costPrice = newProductData?.costPrice;
      product.salePrice = newProductData?.salePrice;
      product.stock = newProductData?.stock;
      product.category = newProductData?.category;
      product.salePorcentage = newProductData?.salePorcentage;

      return await product.save();
    } catch (error) {
      return error;
    }
  },
  updateMany: async (productsToUpdate) => {
    try {
      const productIds = productsToUpdate?.map((product) => product.id);

      const res = await Product.find({
        _id: { $in: productIds },
      });

      const products = [];
      res.forEach((productToUpdate) => {
        productsToUpdate.forEach((product) => {
          if (productToUpdate.id === product.id) {
            productToUpdate.stock = product.stock;
            products.push(productToUpdate);
          }
        });
      });

      let data = undefined;
      if (products.length > 0) {
        data = await Product.bulkSave(products);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
