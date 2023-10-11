require("dotenv").config({ path: "./src/config/.env" });

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const cors = require("cors");

//==========================file imports==========================

const authRoutes = require("./routes/auth.route");
const messageRoutes = require("./routes/message.route");
const chatRoutes = require("./routes/chat.route");
const { errorHandler } = require("./middleware/errorHandler");

//==========================middleware==========================
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  (req.user = { id: "65259c1b2a225b951f9d374a" }), next();
});

//==========================ROUTES==========================
app.get("/", (req, res) => {
  res.send("server is ok good to go");
});
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/chat", chatRoutes);
/**
 *
 * */
app.use("*", (req, res, next) => {
  next("route not found");
});
app.use(errorHandler);
/**
 *
 *
 * */
//==========================Server start==========================
const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
