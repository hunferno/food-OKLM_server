import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true, uppercase: true },
  picture: {
    type: String,
    default:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.2.408958528.1649101096",
  },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  orderId: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Order" }],
  createdAt: { type: Date, default: new Date() },
});

const User = mongoose.model("User", userSchema);

export default User;
