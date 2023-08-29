import { Schema, model, models } from "mongoose";

const fundSchema = new Schema({
  title: String,
  description: String,
  goal: Number,
  email: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    default: 0,
  },
});

const Fund = models.Fund || model("Fund", fundSchema);

export default Fund;
