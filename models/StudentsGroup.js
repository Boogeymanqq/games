import mongoose from 'mongoose'
const { Schema, model, Types } = mongoose

const schema = new Schema({
  groupName: { type: String },
  students: [{ type: Types.ObjectId, ref: 'Student' }],
  teacher: { type: Types.ObjectId, ref: 'Teacher' },
})

export default model('StudentsGroup', schema)
