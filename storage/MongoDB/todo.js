const Todo = require("../../models/todo");
const express = require("express");
const app = express();

let storageTodo = {
	getAll: async () => {
		try {
			const resultTodo = await Todo.find();

			if (!resultTodo) {
				throw new Error("No lists in the database");
			}

			return resultTodo;
		} catch (error) {
			return error.message;
		}
	},

	getOne: async id => {
		try {
			let todo = await Todo.findOne({ _id: id });

			if (!todo) {
				throw new Error("Not found in the database...");
			}
			return todo;
		} catch (error) {
			return error.message;
		}
	},

	create: async data => {
		try {
			const resultTodo = await Todo.create(data);
			return resultTodo;
		} catch (error) {
			return error.message;
		}
	},

	updateOne: async (id, data) => {
		try {
			let todo = await Todo.findOneAndUpdate(
				{ _id: id },
				{ ...data },
				{
					new: true,
				}
			);

			if (!todo) {
				throw new Error("Not found in the database...");
			}

			return todo;
		} catch (error) {
			return error.message;
		}
	},

	deleteOne: async id => {
		try {
			await Todo.findByIdAndRemove({ _id: id });
			return "Deleted";
		} catch (error) {
			throw new Error("Not found");
		}
	},
};

module.exports = storageTodo;
