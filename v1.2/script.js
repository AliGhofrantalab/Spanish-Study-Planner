const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasksElement = document.getElementById("totalTasks");
const completedTasksElement = document.getElementById("completedTasks");
const remainingTasksElement = document.getElementById("remainingTasks");

let tasks = [];
let editingIndex = null;

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }

  renderTasks();
}

function updateCounter() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const remainingTasks = totalTasks - completedTasks;

  totalTasksElement.textContent = totalTasks;
  completedTasksElement.textContent = completedTasks;
  remainingTasksElement.textContent = remainingTasks;
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const taskNumber = document.createElement("div");
    taskNumber.textContent = index + 1;
    taskNumber.classList.add("task-number");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;
    taskSpan.classList.add("task-text");

    if (task.completed) {
      taskSpan.classList.add("completed");
    }

    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    completeBtn.classList.add("complete-btn");

    completeBtn.addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editBtn.classList.add("edit-btn");

    editBtn.addEventListener("click", () => {
      taskInput.value = task.text;
      editingIndex = index;
      addBtn.textContent = "Update Task";
      taskInput.focus();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(taskNumber);
    li.appendChild(taskSpan);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  updateCounter();
}

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  if (editingIndex !== null) {
    tasks[editingIndex].text = taskText;
    editingIndex = null;
    addBtn.textContent = "Add Task";
  } else {
    tasks.push({
      text: taskText,
      completed: false,
    });
  }

  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskInput.focus();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

loadTasks();
