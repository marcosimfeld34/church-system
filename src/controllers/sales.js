import { salesService } from "../services/sales.js";
import { MISSING_FIELDS_REQUIRED, NOT_FOUND } from "../labels/labels.js";

const salesController = {
  getAll: async (req, res) => {
    // const createdBy = req.user.id;

    const { id } = req.query;

    const all = req.query.all === "true" ? true : false;

    const historyMonthToRetrieve = req.query.historyMonthToRetrieve;

    let startDate = new Date();
    let endDate = new Date();

    if (req.query.startDate) {
      startDate = new Date(req.query.startDate);
    }

    if (req.query.endDate) {
      endDate = new Date(req.query.endDate);
    }

    endDate.setDate(endDate.getDate() + 1);

    if (historyMonthToRetrieve) {
      startDate = new Date();
      startDate.setDate(0);
      startDate.setMonth(startDate.getMonth() + 1);
      startDate.setFullYear(startDate.getFullYear() - 1);

      endDate = new Date();
      endDate.setDate(endDate.getDate() + 1);
    }

    const filters = {
      $expr: {
        $and: [
          { $eq: ["$isDeleted", false] },
          { $gte: ["$createdAt", startDate] },
          { $lte: ["$createdAt", endDate] },
        ],
      },
    };

    const sales = await salesService.getAll(
      !id
        ? !all
          ? filters
          : {}
        : {
            $expr: {
              $and: [{ $eq: ["$isDeleted", false] }],
              $and: [{ $eq: ["$_id", id] }],
            },
          }
    );

    return res.status(200).json({
      status: 200,
      total: sales.length,
      data: sales,
    });
  },
  getLastTwelveMonths: async (req, res) => {
    let twelveMonths = new Date();
    twelveMonths.setMonth(twelveMonths.getMonth() - 12);

    const sales = await salesService.getAll({
      $expr: {
        $and: [
          { $gte: [{ $year: "$createdAt" }, twelveMonths.getFullYear()] },
          { $eq: ["$isDeleted", false] },
        ],
      },
    });

    return res.status(200).json({
      status: 200,
      total: sales.length,
      data: sales,
    });
  },
  getOne: async (req, res) => {
    const { id } = req.params;

    const sale = await salesService.getOne({ _id: id });

    if (!sale) {
      return res.status(404).json({
        status: 404,
        message: NOT_FOUND,
      });
    }

    return res.status(200).json({
      status: 200,
      data: sale,
    });
  },
  store: async (req, res) => {
    if (!req.body.client || !req.body.methodPayment || !req.body.total) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: MISSING_FIELDS_REQUIRED,
      });
    }

    const saleToStore = { ...req.body };
    saleToStore.createdBy = req.user.id;
    saleToStore.updatedBy = req.user.id;

    const saleStored = await salesService.store(saleToStore);

    return res.status(201).json({
      status: 201,
      isStored: true,
      data: saleStored,
    });
  },
  delete: async (req, res) => {
    const { id } = req.params;

    const saleDeleted = await salesService.delete(id);

    if (!saleDeleted) {
      return res.status(404).json({
        status: 404,
        isDeleted: false,
        message: NOT_FOUND,
      });
    }

    return res.status(200).json({
      status: 200,
      isDeleted: true,
      data: saleDeleted,
    });
  },
  update: async (req, res) => {
    if (!req.body.client || !req.body.methodPayment || !req.body.total) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: MISSING_FIELDS_REQUIRED,
      });
    }

    const { id } = req.params;

    const oldSale = await salesService.getOne({ _id: id });

    if (!oldSale) {
      return res.status(404).json({
        status: 404,
        isUpdated: false,
        message: NOT_FOUND,
      });
    }

    const newSaleData = { ...oldSale._doc, ...req.body };

    const salesUpdated = await salesService.update(id, newSaleData);

    return res.status(200).json({
      status: 200,
      isUpdated: true,
      data: salesUpdated,
    });
  },
};

export default salesController;
