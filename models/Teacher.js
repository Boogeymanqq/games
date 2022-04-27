const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  surname: { type: String, required: true },
  name: { type: String, required: true },
  patronymic: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  students: [{ type: Types.ObjectId, hef: 'Student'}]
});

module.exports = model("Teacher", schema);
