const express = require("express");
const Joi = require("joi");
const router = express.Router();
const storageTodo = require("../storage/MongoDB/todo");
const checkAuth = require('../middleware/checkAuth');

router.get("/", checkAuth, async (req, res) => {
	try {
		const resultTodo = await storageTodo.getAll();
		return res.status(200).send(resultTodo);
	} catch (error) {
		return res.status(404).send({ error: error.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const resultTodo = await storageTodo.getOne(req.params.id);
		return res.status(200).send(resultTodo);
	} catch (error) {
		return res.status(404).send({ error: error.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const { error } = validateTodo(req.body);
		if (error) throw new Error(error.message);
		const resultTodo = await storageTodo.create(req.body);
		return res.status(201).send({ success: true, id: resultTodo });
	} catch (error) {
		return res.status(404).send({ error: error.message });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { error } = validateTodo(req.body);
		if (error) throw new Error(error.message);
		const resultTodo = await storageTodo.updateOne(req.params.id, req.body);
		return res.status(200).send({ id: resultTodo });
	} catch (error) {
		return res.status(404).send({ error: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const resultTodo = await storageTodo.deleteOne(req.params.id);
		return res.status(200).send({ msg: resultTodo });
	} catch (error) {
		return res.status(404).send({ error: error.message });
	}
});

const validateTodo = todo => {
	const schema = Joi.object({
		name: Joi.string().trim().min(5).max(20).required(),
		description: Joi.string().trim().min(8).max(20),
	});
	return schema.validate(todo);
};

module.exports = router;
