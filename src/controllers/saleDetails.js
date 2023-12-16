import { saleDetailsService } from "../services/saleDetails.js";
import { MISSING_FIELDS_REQUIRED, NOT_FOUND } from "../labels/labels.js";

const saleDetailsController = {
  getAll: async (req, res) => {
    // const createdBy = req.user.id;

    let today = new Date();

    let filters = {
      $expr: {
        $and: [
          { $eq: ["$isDeleted", false] },
          { $eq: [{ $dayOfMonth: "$createdAt" }, today.getDate()] },
          { $eq: [{ $month: "$createdAt" }, today.getMonth() + 1] },
          { $eq: [{ $year: "$createdAt" }, today.getFullYear()] },
        ],
      },
    };

    const saleDetails = await saleDetailsService.getAll(filters);

    return res.status(200).json({
      status: 200,
      total: saleDetails.length,
      data: saleDetails,
    });
  },
  getTotalSale: async (req, res) => {
    let today = new Date();

    const options = {
      $expr: {
        $and: [
          { $eq: ["$isDeleted", false] },
          { $eq: [{ $dayOfMonth: "$createdAt" }, today.getDate()] },
          { $eq: [{ $month: "$createdAt" }, today.getMonth() + 1] },
          { $eq: [{ $year: "$createdAt" }, today.getFullYear()] },
        ],
      },
    };

    const saleDetails = await saleDetailsService.getTotalByDate(options);
    const totalCostSold = saleDetails
      ?.map((saleDetail) => saleDetail.product.costPrice * saleDetail.quantity)
      ?.reduce((acc, currentValue) => acc + currentValue, 0);

    return res.status(200).json({
      status: 200,
      total: saleDetails.length,
      data: saleDetails,
    });
  },
  getOne: async (req, res) => {
    const { id } = req.params;

    const saleDetail = await saleDetailsService.getOne({ _id: id });

    if (!saleDetail) {
      return res.status(404).json({
        status: 404,
        message: NOT_FOUND,
      });
    }

    return res.status(200).json({
      status: 200,
      data: saleDetail,
    });
  },
  store: async (req, res) => {
    if (
      !req.body.product ||
      !req.body.sale ||
      !req.body.quantity ||
      !req.body.subtotal
    ) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: MISSING_FIELDS_REQUIRED,
      });
    }

    const saleDetailToStore = { ...req.body };
    saleDetailToStore.createdBy = req.user.id;
    saleDetailToStore.updatedBy = req.user.id;

    const saleDetailStored = await saleDetailsService.store(saleDetailToStore);

    return res.status(201).json({
      status: 201,
      isStored: true,
      data: saleDetailStored,
    });
  },
  storeMany: async (req, res) => {
    if (!req.body.saleDetails && req.body.saleDetails.length > 0) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: MISSING_FIELDS_REQUIRED,
      });
    }

    const saleDetailToStore = req.body.saleDetails.map((saleDetail) => {
      return { ...saleDetail, createdBy: req.user.id, updatedBy: req.user.id };
    });

    const data = await saleDetailsService.storeMany(saleDetailToStore);

    return res.status(201).json({
      status: 201,
      isStored: true,
      data,
    });
  },
  delete: async (req, res) => {
    const { id } = req.params;

    const saleDetailDeleted = await saleDetailsService.delete(id);

    if (!saleDetailDeleted) {
      return res.status(404).json({
        status: 404,
        isDeleted: false,
        message: NOT_FOUND,
      });
    }

    return res.status(200).json({
      status: 200,
      isDeleted: true,
      data: saleDetailDeleted,
    });
  },
  deleteMany: async (req, res) => {
    if (!req.body.saleDetails && req.body.saleDetails.length > 0) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: MISSING_FIELDS_REQUIRED,
      });
    }

    const data = await saleDetailsService.deleteMany(req.body.saleDetails);

    return res.status(200).json({
      status: 200,
      isDeleted: true,
      data,
    });
  },
  updateMany: async (req, res) => {
    if (!req.body.saleDetails && req.body.saleDetails.length > 0) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: MISSING_FIELDS_REQUIRED,
      });
    }

    const saleDetailToUpdate = req.body.saleDetails.map((saleDetail) => {
      return {
        ...saleDetail,
      };
    });

    const data = await saleDetailsService.updateMany(saleDetailToUpdate);

    return res.status(200).json({
      status: 200,
      isUpdated: true,
      data,
    });
  },
};

export default saleDetailsController;
