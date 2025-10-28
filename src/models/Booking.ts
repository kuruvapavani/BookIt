import mongoose, { Schema, models } from "mongoose";

const bookingSchema = new Schema({
  experienceId: String,
  user: {
    name: String,
    email: String,
  },
  slot: String,
  price: Number,
  status: { type: String, default: "confirmed" },
});

const Booking = models.Booking || mongoose.model("Booking", bookingSchema);
export default Booking;
