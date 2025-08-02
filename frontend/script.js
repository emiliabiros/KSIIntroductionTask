document.addEventListener("DOMContentLoaded", function () {
    const inputContainer = document.getElementById("taskInputContainer");
    const input = document.getElementById("taskInput");
    const addButton = document.getElementById("addTaskButton");
    const confirmAddButton = document.getElementById("confirmAddTask");
    const taskList = document.getElementById("taskList");

    const API_URL = "http://localhost:8000";

    function showInput() {
        inputContainer.style.display = "block";
        addButton.style.display = "none";
        input.focus();
    }

    function hideInput() {
        inputContainer.style.display = "none";
        addButton.style.display = "block";
    }

    function renderTasks(tasks) {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const taskDiv = document.createElement("div");
            const textSpan = document.createElement("span");
            textSpan.textContent = task.title;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "delete";

            deleteButton.addEventListener("click", () => {
                deleteTask(task.id);
            });

            taskDiv.appendChild(textSpan);
            taskDiv.appendChild(deleteButton);
            taskList.appendChild(taskDiv);
        });
    }

    async function fetchTasks() {
        try {
            const res = await fetch(`${API_URL}/`);
            if (res.ok) {
                const data = await res.json();
                renderTasks(data);
            } else {
                console.error("Failed to fetch tasks");
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    async function addTask() {
        const taskText = input.value.trim();
        if (taskText === "") return;

        try {
            const res = await fetch(`${API_URL}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: taskText }),
            });
            if (res.ok) {
                input.value = "";
                hideInput();
                fetchTasks();
            } else {
                console.error("Failed to add task");
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }

    async function deleteTask(taskId) {
        try {
            const res = await fetch(`${API_URL}/${taskId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                fetchTasks();
            } else {
                console.error("Failed to delete task");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    addButton.addEventListener("click", showInput);

    confirmAddButton.addEventListener("click", addTask);

    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            hideInput();
        }
    });

    document.addEventListener("click", function (event) {
        if (
            inputContainer.style.display === "block" &&
            !inputContainer.contains(event.target) &&
            event.target !== addButton
        ) {
            hideInput();
        }
    });

    fetchTasks();
});