const schema = new Schema({
  surname: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  teacher: [{ type: Types.ObjectId, hef: 'Teacher'}]
});

module.exports = model("Student", schema);