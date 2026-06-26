const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");

function updateCounter() {
  const totalTasks = taskList.children.length;
  const completedTasks = document.querySelectorAll(".completed").length;
  const remainingTasks = totalTasks - completedTasks;
  taskCounter.textContent = `Total: ${totalTasks} | Completed: ${completedTasks} | Remaining: ${remainingTasks}`;
}

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  const li = document.createElement("li");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;
  taskSpan.classList.add("task-text");

  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  completeBtn.classList.add("complete-btn");

  completeBtn.addEventListener("click", () => {
    taskSpan.classList.toggle("completed");
    updateCounter();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateCounter();
  });

  li.appendChild(taskSpan);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
  updateCounter();
  taskInput.value = "";
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});
updateCounter();
