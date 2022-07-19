import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const schema = new Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  openPas: { type: String },
  comment: { type: String },
  teacher: [{ type: Types.ObjectId, ref: "Teacher" }],
});

export default model("Student", schema);
