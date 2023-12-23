import mongoose from "mongoose";

const { Schema, SchemaTypes, model } = mongoose;

const methodPaymentSchema = new Schema({
  name: {
    type: String,
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

const MethodPayment = model("methodPayment", methodPaymentSchema);

export default MethodPayment;
