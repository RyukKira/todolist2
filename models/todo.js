const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	name: {
		type: String,
		required: [true, "Name field is required"],
	},
	description: String,
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
