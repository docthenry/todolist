const todoList = document.getElementById("todo-list");
const newTaskInput = document.getElementById("new-task");
const addButton = document.getElementById("add-button");

let tasks = [];

const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
}

function renderTasks() {
  todoList.innerHTML = "";
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = task;
    listItem.dataset.index = index;

    listItem.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(this.dataset.index, 1);
        renderTasks();
        saveTasksToLocalStorage();
      }
    });

    listItem.addEventListener("dblclick", function () {
      const newTaskText = prompt("Edit task:", task);
      if (newTaskText && newTaskText !== "") {
        tasks[this.dataset.index] = newTaskText; 
        renderTasks();
        saveTasksToLocalStorage();
      }
    });

    todoList.appendChild(listItem);
  });
}

function addNewTask() {
  const newTask = newTaskInput.value.trim();
  if (newTask) {
    tasks.push(newTask); 
    newTaskInput.value = "";
    renderTasks();
    saveTasksToLocalStorage();
  }
}

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


addButton.addEventListener("click", addNewTask);
newTaskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addNewTask();
  }
});

renderTasks();
