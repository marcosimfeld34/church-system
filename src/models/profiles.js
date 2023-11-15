import mongoose from "mongoose";

const { Schema, SchemaTypes, model } = mongoose;

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  developerName: {
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

const Profile = model("profile", profileSchema);

export default Profile;
