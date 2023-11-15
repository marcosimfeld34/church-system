import SaleDetail from "../models/saleDetails.js";

export const saleDetailsService = {
  getAll: (options) => {
    try {
      return SaleDetail.find({ ...options })
        .populate("product")
        .populate("createdBy")
        .sort({ createdAt: -1 });
    } catch (error) {
      return error;
    }
  },
  getOne: (options) => {
    try {
      return SaleDetail.findOne({ ...options });
    } catch (error) {
      return error;
    }
  },
  store: (newSaleDetail) => {
    try {
      return SaleDetail.create(newSaleDetail);
    } catch (error) {
      return error;
    }
  },
  storeMany: async (newSaleDetails) => {
    const data = await SaleDetail.insertMany(newSaleDetails);
    return data;
  },
  delete: (id) => {
    try {
      return SaleDetail.findByIdAndUpdate(
        id,
        {
          deletedAt: new Date(),
          isDeleted: true,
        },
        { new: true }
      );
    } catch (error) {
      return error;
    }
  },
  deleteMany: async (saleDetailIds) => {
    try {
      return await SaleDetail.deleteMany({ _id: { $in: saleDetailIds } });
    } catch (error) {
      return error;
    }
  },
  updateMany: async (saleDetailsToUpdate) => {
    try {
      const newSaleDetailIds = saleDetailsToUpdate?.map(
        (saleDetailToUpdate) => saleDetailToUpdate.id
      );

      const saleDetails = await SaleDetail.find({
        _id: { $in: newSaleDetailIds },
      });

      saleDetails.map((saleDetail) => {
        saleDetailsToUpdate.forEach((saleDetailToUpdate) => {
          if (saleDetail.id === saleDetailToUpdate.id) {
            saleDetail.quantity = saleDetailToUpdate.quantity;
            saleDetail.product = saleDetailToUpdate.product;
            saleDetail.sale = saleDetailToUpdate.sale;
            saleDetail.subtotal = saleDetailToUpdate.subtotal;
            return saleDetail;
          }
        });
      });

      let data = undefined;
      if (saleDetails.length > 0) {
        data = await SaleDetail.bulkSave(saleDetails);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
