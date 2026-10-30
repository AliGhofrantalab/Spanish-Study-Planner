const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    return;
  }
  const li = document.createElement("li");
  li.textContent = taskText;
  taskList.appendChild(li);
  taskInput.value = "";
}
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addTask();
});
/*addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    return;
  }
  const li = document.createElement("li");
  li.textContent = taskText;
  taskList.appendChild(li);
  taskInput.value = "";
});*/
