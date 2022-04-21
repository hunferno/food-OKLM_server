import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

//TOUS LES IMPORTS DES ROUTES
import foodRoutes from "./routes/food.js";
import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/order.js";

const app = express();
const PORT = process.env.PORT || 8000;

//SETUP DE BASE
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//ROUTING PATH
app.use("/api/foods", foodRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes)

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Le serveur fonctionne sur le port : ${PORT}`)
    )
  )
  .catch((err) => console.log(err));
