import { useState, useEffect } from "react";
import axios from "axios";

function App() {
	const [students, setStudents] = useState([]);
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");

	// Fetch all students
	const getStudents = async () => {
		try {
			const response = await axios.get("http://localhost:5000/students");
			setStudents(response.data);
		} catch (err) {
			console.error(err.message);
		}
	};

	// Add a student
	const addStudent = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:5000/students", { fname, lname });
			setStudents([...students, response.data]);
			setFname("");
			setLname("");
		} catch (err) {
			console.error(err.message);
		}
	};

	// Delete a student
	const deleteStudent = async (id) => {
		try {
			await axios.delete(`http://localhost:5000/students/${id}`);
			setStudents(students.filter((student) => student.id !== id));
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		getStudents();
	}, []);

	return (
		<div className="App">
			<h1>Student Management</h1>

			<form onSubmit={addStudent}>
				<input
					type="text"
					placeholder="First Name"
					value={fname}
					onChange={(e) => setFname(e.target.value)}
					required
				/>
				<input
					type="text"
					placeholder="Last Name"
					value={lname}
					onChange={(e) => setLname(e.target.value)}
					required
				/>
				<button type="submit">Add Student</button>
			</form>

			<h2>All Students</h2>
			<ul>
				{students.map((student) => (
					<li key={student.id}>
						{student.fname} {student.lname}
						<button onClick={() => deleteStudent(student.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
