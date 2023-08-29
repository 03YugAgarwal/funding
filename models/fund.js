import { Schema, model, models } from "mongoose";

const fundSchema = new Schema({
  title: String,
  description: String,
  goal: Number,
  image: String,
  amount: {
    type: Number,
    default: 0,
  },
});

const Fund = models.Fund || model("Fund", fundSchema);

export default Fund;
