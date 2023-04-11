import { React, useState, useEffect } from "react";
import InputList from "./TodoList";
function InputTodo() {
	const [tasks, setTask] = useState([
		{ name: "Clean room", completed: false },
		{ name: "Sweep Floor", completed: false },
		{ name: "Learn React", completed: false },
		{ name: "Learn Tailwind", completed: false },
		{ name: "Be nice :)", completed: false },
	]);

	useEffect(() => {
		const storedState = localStorage.getItem("actualTasksFromCache");
		
		if (storedState) {
			setTask(JSON.parse(storedState));
		}
	}, []);
	const addAnotherTask = () => {
		const input = document.querySelector("#taskInput");
		if (input.value == "") {
			alert("Provide some text for your task");
			return;
		}

		const [...subTasks] = tasks;
		subTasks.push({ name: input.value, completed: false });
		input.value = "";
		setTask(subTasks);
		localStorage.setItem("actualTasksFromCache", JSON.stringify(subTasks));
	};
	const callBackRemoveTask = (newTaskList) => {setTask([...newTaskList]); localStorage.setItem("actualTasksFromCache", JSON.stringify([...newTaskList]));};
	const changeTheme = () =>
		document.documentElement.getAttribute("data-theme") == "dark"
			? document.documentElement.setAttribute("data-theme", "light")
			: document.documentElement.setAttribute("data-theme", "dark");
	return (
		<main>
			<div className="Todo__input">
				<div className="Todo__darkMode">
					<h1>TODO</h1>
					<button onClick={changeTheme}></button>
				</div>
				<div className="Todo__inputButton">
					<button
						className="Todo__submitButton"
						onClick={addAnotherTask}
					></button>
					<input
						id="taskInput"
						type="text"
						placeholder="Create new todo..."
					></input>
				</div>
			</div>
			<InputList callBackRemoveTask={callBackRemoveTask} tasksList={tasks} />
		</main>
	);
}

export default InputTodo;
