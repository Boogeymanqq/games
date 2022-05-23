const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  teacher: [{ type: Types.ObjectId, ref: "Teacher" }],
});

module.exports = model("Student", schema);
