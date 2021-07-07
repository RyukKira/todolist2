const Todo = require("../../models/todo");
const express = require("express");
const app = express();

let storageTodo = {
	getAll: async () => {
		try {
			const resultTodo = await Todo.find();
			return resultTodo;
		} catch (error) {
			throw new Error(error.message);
		}
	},
	getOne: async (id) => {
		try {
			let todo = await Todo.findOne({ _id: id });

			if (!todo) {
				throw new Error("Not found in the database...");
			}
			return todo;
		} catch (error) {
			throw new Error(error.message);
		}
	},
	create: async (data) => {
		let todo = new Todo(data);

		try {
			const resultTodo = await todo.save();
			return resultTodo.id;
		} catch (error) {
			throw new Error(error.message);
		}
	},
	updateOne: async (id, data) => {
		try {
			let todo = await Todo.findOne({ _id: id });

			if (!todo) {
				throw new Error("Not found in the database...");
			}

			todo.name = data.name;
			todo.description = data.description;
			const resultTodo = await todo.save();

			return resultTodo.id;
		} catch (error) {
			throw new Error(error.message);
		}
	},
	deleteOne: async (id) => {
		try {
			await Todo.findOneAndDelete({ _id: id });
			return "Deleted";
		} catch (error) {
			throw new Error("Not found");
		}
	},
};

module.exports = storageTodo;
