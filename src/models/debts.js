import mongoose from "mongoose";

const { Schema, SchemaTypes, model } = mongoose;

const debtSchema = new Schema({
  client: {
    type: SchemaTypes.ObjectId,
    ref: "client",
    required: true,
  },
  sale: {
    type: SchemaTypes.ObjectId,
    ref: "sale",
    required: true,
  },
  initialAmount: {
    type: Number,
    required: true,
  },
  deliveredAmount: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
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

const Debt = model("debt", debtSchema);

export default Debt;
