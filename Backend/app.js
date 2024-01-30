const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const authRoute = require("./src/routes/authRoute");
const promoCodeRoute = require("./src/routes/promoCodeRoute");
const customerRoute = require("./src/routes/customerRoute");
const productRoute = require("./src/routes/productRoute");
const cors = require("cors");

const mongoDBUrl =
  "mongodb+srv://giorgitopchishvili01:B59A407kJYxgyKHu@cluster0.wsdrciu.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");
});

app.use("/auth", authRoute);
app.use("/promo", promoCodeRoute);
app.use("/customer", customerRoute);
app.use("/product", productRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
