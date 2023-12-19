import Sale from "../models/sales.js";

export const salesService = {
  getAll: (options) => {
    try {
      return Sale.find({ ...options })
        .populate("createdBy", ["firstName", "lastName"])
        .populate("client", "name")
        .sort({ sortingDate: -1 });
    } catch (error) {
      return error;
    }
  },
  getTotalByDate: (options) => {
    try {
      return Sale.aggregate([
        {
          $match: options,
        },
        {
          $group: {
            _id: null,
            totalSum: { $sum: "$total" },
          },
        },
      ]);
    } catch (error) {
      return error;
    }
  },
  getOne: (options) => {
    try {
      return Sale.findOne({ ...options });
    } catch (error) {
      return error;
    }
  },
  store: (newSale) => {
    try {
      return Sale.create(newSale);
    } catch (error) {
      return error;
    }
  },
  delete: (id) => {
    try {
      return Sale.deleteOne({ _id: id });
    } catch (error) {
      return error;
    }
  },
  update: async (id, newSaleData) => {
    try {
      const sale = await Sale.findOne({ _id: id });
      sale.client = newSaleData?.client;
      sale.isPaid = newSaleData?.isPaid;
      sale.total = newSaleData?.total;

      return await sale.save();
    } catch (error) {
      return error;
    }
  },
};
