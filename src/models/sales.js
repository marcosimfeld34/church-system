import mongoose from "mongoose";

const { Schema, SchemaTypes, model } = mongoose;

const saleSchema = new Schema({
  client: {
    type: SchemaTypes.ObjectId,
    ref: "client",
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

const Sale = model("sale", saleSchema);

export default Sale;
