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
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
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
