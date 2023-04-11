/* eslint-disable react/prop-types */
import { React} from "react";
function TodoList({tasksList,callBackRemoveTask}) {
	// eslint-disable-next-line no-unused-vars
	let actualFilter = "All";
	let activeTasks = tasksList.length;

	const clearComplited = () => {
		const newTaskList = tasksList.filter(
			(item) => item.completed == false
		);
		document.querySelectorAll('.Todo__task--completed').forEach(item =>{
			if(item.getAttribute("data-completed") == "true")
			{
				item.setAttribute("data-completed",false);
				item.classList.remove("Todo__task--checked");
			}
		});
		// document.getElementById(`${index}`).setAttribute("data-completed", false);
		// document.getElementById(`${index}`).classList.remove("Todo__task--checked");
		callBackRemoveTask(newTaskList);
	};
	const filter = condition => {
		activeTasks = 0;
		document.querySelectorAll("[data-completed]").forEach((item) => {
			let a = item.getAttribute("data-completed");
			if (a == condition) {
				item.parentElement.style.display = "none";
			} else {
				item.parentElement.style.display = "flex";
				activeTasks++;
			}
		});
		document.querySelector(
			".Todo__itemsCounter"
		).innerHTML = `${activeTasks} items left`;
	};
	const changeFilter = (event) => {
		document.querySelector(`.${actualFilter}`).style.color =
			"hsl(234, 11%, 52%)";
		let filterType = event.target.className;
		event.target.style.color = "hsl(220, 98%, 61%)";
		switch (filterType) {
			case "All":
				filter("a");
				activeTasks = tasksList.length;
				break;
			case "Completed":
				filter("false")
				break;
			case "Active":
				filter("true");
				break;
			case "Default":
		}

		actualFilter = (event.target.className);
	};

	return (
		<div className="Todo__list">
			{tasksList.map((task, index) => {
				return (
					<div className="Todo__listTask" key={index}>
						
						<button 
							data-completed={task.completed}
							id={index}
							onClick={(event) => {
								task.completed = !task.completed;
								event.target.setAttribute("data-completed", task.completed);
								task.completed
									? event.target.classList.add("Todo__task--checked")
									: event.target.classList.remove("Todo__task--checked");
							}}
							className="Todo__task--completed"
						>
						</button>
						<p>{task.name}</p>
						<div className="Todo__task--removeWrapper">
							<button
								onClick={() => {
									
									tasksList.splice(index, 1);
									callBackRemoveTask(tasksList);
									document.getElementById(`${index}`).setAttribute("data-completed",false);
									document
										.getElementById(`${index}`)
										.classList.remove("Todo__task--checked");
								}}
								className="Todo__task--remove"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
									<path
										fill="#494C6B"
										fillRule="evenodd"
										d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
									/>
								</svg>
							</button>
						</div>
					</div>
				);
			})}
			<div className="Todo__filters">
				<p className="Todo__itemsCounter">{`${activeTasks} items left`}</p>
				<div className="Todo__filterOptions">
					<p onClick={changeFilter} className="All">
						All
					</p>
					<p onClick={changeFilter} className="Active">
						Active
					</p>
					<p onClick={changeFilter} className="Completed">
						Completed
					</p>
				</div>
				<p onClick={clearComplited} className="Clear Completed">
					Clear Completed
				</p>
			</div>
		</div>
	);
}

export default TodoList;
