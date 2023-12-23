import MethodPayment from "../models/methodPayments.js";

export const methodPaymentService = {
  getAll: (options) => {
    try {
      return MethodPayment.find({ ...options }, ["name"]).sort({
        createdAt: -1,
      });
    } catch (error) {
      return error;
    }
  },
  getOne: (options) => {
    try {
      return MethodPayment.findOne({ ...options });
    } catch (error) {
      return error;
    }
  },
  store: (newMethodPayment) => {
    try {
      return MethodPayment.create(newMethodPayment);
    } catch (error) {
      return error;
    }
  },
  delete: (id) => {
    try {
      return MethodPayment.deleteOne({ _id: id });
    } catch (error) {
      return error;
    }
  },
  update: async (id, newMethodPaymentData) => {
    try {
      const methodPayment = await MethodPayment.findOne({ _id: id });
      methodPayment.name = newMethodPaymentData.name;

      return await methodPayment.save();
    } catch (error) {
      return error;
    }
  },
};
