import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  foods: [
    {
      foodId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Food",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  createdAt: { type: Date, default: new Date() },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
