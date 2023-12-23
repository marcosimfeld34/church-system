import mongoose from "mongoose";

const { Schema, SchemaTypes, model } = mongoose;

const saleSchema = new Schema({
  client: {
    type: SchemaTypes.ObjectId,
    ref: "client",
    required: true,
  },
  methodPayment: {
    type: SchemaTypes.ObjectId,
    ref: "methodPayment",
    required: true,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  total: {
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

const Sale = model("sale", saleSchema);

export default Sale;
