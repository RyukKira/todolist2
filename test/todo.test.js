const setBase = require("./database-setup");
const storageTodo = require("../storage/MongoDB/todo");
const model = require("../models/todo");

setBase();

// Creating new todo

describe("Create", () => {
	let todo;
	test("create new todo", async () => {
		todo = storageTodo.create({
			name: "Muhammadqodir",
			description: "Clever",
		});
		todo = await todo;
		expect(todo.name).toEqual("Muhammadqodir");
	});

	test("couldn't create new todo", async () => {
		try {
			let falseData = storageTodo.create({
				description: "joking",
			});
			falseData = await falseData;
		} catch (e) {
			expect(e.message).toEqual(
				"Todo validation failed: name: Name field is required"
			);
		}
	});

	test("give me todo list", async () => {
		let findtodo = storageTodo.getOne(todo._id);
		findtodo = await findtodo;
		expect(findtodo._id).toEqual(todo._id);
	});

	test("couldn't give me list", async () => {
		try {
			let falseData = storageTodo.getOne(
				String(todo._id).substring(0, todo._id.length - 2) + "e"
			);
			falseData = await falseData;
		} catch (e) {
			expect(e.message).toEqual("Not found in the database");
		}
	});

	test("give me all list", async () => {
		let allTodo = storageTodo.getAll();
		allTodo = await allTodo;
		expect(allTodo).toBeTruthy();
	});

	test("couldn't give me all lists", async () => {
		try {
			let allFalse = storageTodo.getAll();
			allFalse = await allFalse;
		} catch (e) {
			expect(e.message).toEqual("No lists in the database");
		}
	});

	test("update an existing todo", async () => {
		let updatedTodo = storageTodo.updateOne(todo._id, { name: "RyukKira" });
		updatedTodo = await updatedTodo;
		expect(updatedTodo.name).toEqual("RyukKira");
	});

	test("couldn't update a todo list", async () => {
		try {
			let falseUpdate = storageTodo.updateOne(todo._id, { name: 4534 });
			falseUpdate = await falseUpdate;
		} catch (e) {
			expect(e.message).toEqual("Not found in the database...");
		}
	});

	test("deleted one todo list", () => {
		expect(storageTodo.deleteOne(todo._id)).toMatchObject({});
	});

	test("couldn't delete one", () => {
		try {
			storageTodo.deleteOne(todo._id);
		} catch (e) {
			expect(e.message).toEqual("Not found");
		}
	});
});
