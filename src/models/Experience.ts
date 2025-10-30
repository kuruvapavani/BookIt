import mongoose, { Schema, models } from "mongoose";

const experienceSchema = new Schema({
  title: String,
  location: String,
  description: String,
  image: String,
  price: Number,
  slots: [
    {
      date: String,
      time: String,
      left: Number,
      available: Boolean,
    },
  ],
});

const Experience =
  models.Experience || mongoose.model("Experience", experienceSchema);
export default Experience;
