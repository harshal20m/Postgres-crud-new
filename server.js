const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json()); // req.body

// ROUTES

// Create a student
app.post("/students", async (req, res) => {
	try {
		const { fname, lname } = req.body;
		const newStudent = await pool.query("INSERT INTO student (fname, lname) VALUES($1, $2) RETURNING *", [
			fname,
			lname,
		]);
		res.json(newStudent.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// Get all students
app.get("/students", async (req, res) => {
	try {
		const allStudents = await pool.query("SELECT * FROM student");
		res.json(allStudents.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// Get a student
app.get("/students/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const student = await pool.query("SELECT * FROM student WHERE id = $1", [id]);
		res.json(student.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// Update a student
app.put("/students/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { fname, lname } = req.body;
		await pool.query("UPDATE student SET fname = $1, lname = $2 WHERE id = $3", [fname, lname, id]);
		res.json("Student was updated!");
	} catch (err) {
		console.error(err.message);
	}
});

// Delete a student
app.delete("/students/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await pool.query("DELETE FROM student WHERE id = $1", [id]);
		res.json("Student was deleted!");
	} catch (err) {
		console.error(err.message);
	}
});

app.listen(5000, () => {
	console.log("Server is running on port 5000");
});
