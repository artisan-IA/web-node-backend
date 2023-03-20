const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const review_labelSchema = new Schema({
  review_id: { type: String },
  place_id: { type: String },
  review: { type: String},
  review_language: { type: String },
  openai_labels: [{type: String}],
  question: {type: String},
  labels_0: [{type: String}],
  worker0: {
    type: String,
    default: null},
},
{
  timestamps: true
});

const review_label = mongoose.model("review_label", review_labelSchema);

module.exports = review_label;