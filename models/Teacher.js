const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  patronymic: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  students: [{ type: Types.ObjectId, hef: 'Student'}]
});

module.exports = model("Teacher", schema);