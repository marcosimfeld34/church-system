import mongoose from "mongoose";

const { Schema, SchemaTypes, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  costPrice: {
    type: Number,
    required: true,
  },
  salePorcentage: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  category: {
    type: SchemaTypes.ObjectId,
    ref: "category",
    required: true,
  },
  stock: {
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

const Product = model("product", productSchema);

export default Product;
