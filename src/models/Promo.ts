import mongoose, { Schema, models } from "mongoose";

const promoSchema = new Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ["flat", "percent"], default: "flat" },
  discountValue: { type: Number, required: true },
  expiryDate: { type: Date }, // optional
  active: { type: Boolean, default: true },
});

const Promo = models.Promo || mongoose.model("Promo", promoSchema);
export default Promo;
