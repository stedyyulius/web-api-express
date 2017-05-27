const mongoose = require('mongoose')
const Schema = mongoose.Schema

var memoSchema = new Schema({
  memo: String,
  created_at: Date,
  user_id: {type: Schema.Types.ObjectId, ref:"User"}
})

var Memo = mongoose.model('Memo', memoSchema)

module.exports = Memo