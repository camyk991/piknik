import mongoose from "mongoose";

let offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  { collection: "offers" }
);

const Offer = mongoose.model("Offer", offerSchema, "offers");

export default Offer;
