import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
  category : { type: String, enum: ["Entrée", "Plat", "Dessert", "Boisson"], required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  picture : {
    type: String,
    default: "https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg?size=626&ext=jpg&ga=GA1.2.408958528.1649101096",
  },
  description: { type: String },
  ingredients: [{ type: String, required: true }],
  createdAt: { type: Date, default: new Date() },
});

const Food = mongoose.model("Food", foodSchema);

export default Food;
