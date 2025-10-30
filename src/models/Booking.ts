import mongoose, { Schema, models } from "mongoose";

const bookingSchema = new Schema(
  {
    experienceId: {
      type: Schema.Types.ObjectId,
      ref: "Experience",
      required: true,
    },
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "pending"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

const Booking = models.Booking || mongoose.model("Booking", bookingSchema);
export default Booking;
