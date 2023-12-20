import mongoose from "mongoose";

const { Schema, SchemaTypes, model } = mongoose;

const saleDetailSchema = new Schema({
  product: {
    type: SchemaTypes.ObjectId,
    ref: "product",
    required: true,
  },
  sale: {
    type: SchemaTypes.ObjectId,
    ref: "sale",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    inmutable: true,
    default: () => {
      let now = new Date().toLocaleString("es-MX", {
        timeZone: "America/Argentina/Buenos_Aires",
      });
      let dateWithoutTime = now.split(",")[0];

      let day = dateWithoutTime.split("/")[0];
      let month = dateWithoutTime.split("/")[1];
      let year = dateWithoutTime.split("/")[2];

      let dateToSave = new Date(`${month}/${day}/${year}`);

      dateToSave.setHours(12, 0, 0, 0);

      return dateToSave;
    },
  },
  updatedAt: {
    type: Date,
    default: () => {
      let now = new Date().toLocaleString("es-MX", {
        timeZone: "America/Argentina/Buenos_Aires",
      });
      let dateWithoutTime = now.split(",")[0];

      let day = dateWithoutTime.split("/")[0];
      let month = dateWithoutTime.split("/")[1];
      let year = dateWithoutTime.split("/")[2];

      let dateToSave = new Date(`${month}/${day}/${year}`);

      dateToSave.setHours(12, 0, 0, 0);

      return dateToSave;
    },
  },
  sortingDate: {
    type: Date,
    inmutable: true,
    default: () => new Date(),
  },
  deletedAt: {
    type: Date,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
  updatedBy: {
    type: SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
});

const SaleDetail = model("saleDetail", saleDetailSchema);

export default SaleDetail;
