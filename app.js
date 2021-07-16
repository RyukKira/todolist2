const logger = require("./config/logger");
const cfg = require("./config/config");
const express = require("express");
let app = express();
const mongoose = require("mongoose");
const todoRouter = require("./routes/todo");

mongoose
	.connect("mongodb://localhost:27017/todos", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("Connected to MongoDB...");
	})
	.catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/todos", todoRouter);

app.listen(3000, () => console.log("Server is up and running on port 3000..."));
