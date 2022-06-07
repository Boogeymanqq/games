import mongoose from 'mongoose'
const { Schema, model, Types } = mongoose

const schema = new Schema({
  templateName: { type: String },
  game: { type: String },
  components: [{ type: Types.ObjectId, ref: 'MonsterPart' }],
  teacher: { type: Types.ObjectId, ref: 'Teacher' },
})

export default model('GameTemplate', schema)
