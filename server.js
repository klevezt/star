const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const corsOptions = require("./config/corsOptions")

const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/public/assets/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

app.use(bodyParser.json());
app.use(multer({ storage: fileStorage }).single("image"));

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to MongoDB database");
});

const usersRouter = require("./routes/users");
const categoryRouter = require("./routes/category");
const postRouter = require("./routes/post");
const auth = require("./routes/auth");

app.use("/users", usersRouter);
app.use("/post", postRouter);
app.use("/category", categoryRouter);
app.use("/auth", auth);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () =>
  console.log(`API is running on http://localhost:${port}`)
);