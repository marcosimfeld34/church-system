import Debt from "../models/debts.js";

export const debtService = {
  getAll: (options) => {
    try {
      return Debt.find({ ...options })
        .populate("client")
        .populate("sale")
        .sort({ createdAt: -1 });
    } catch (error) {
      return error;
    }
  },
  getOne: (options) => {
    try {
      return Debt.findOne({ ...options });
    } catch (error) {
      return error;
    }
  },
  store: (newDebt) => {
    try {
      return Debt.create(newDebt);
    } catch (error) {
      return error;
    }
  },
  delete: (id) => {
    try {
      return Debt.deleteOne({ _id: id });
    } catch (error) {
      return error;
    }
  },
  update: async (id, newDebtData) => {
    try {
      const debt = await Debt.findOne({ _id: id });
      debt.client = newDebtData.client;
      debt.sale = newDebtData.sale;
      debt.initialAmount = newDebtData.initialAmount;
      debt.deliveredAmount = newDebtData.deliveredAmount;
      debt.isPaid = newDebtData.isPaid;

      return await debt.save();
    } catch (error) {
      return error;
    }
  },
};
