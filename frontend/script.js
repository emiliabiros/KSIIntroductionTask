document.addEventListener("DOMContentLoaded", function () {
    const inputContainer = document.getElementById("taskInputContainer");
    const input = document.getElementById("taskInput");
    const addButton = document.getElementById("addTaskButton");
    const confirmAddButton = document.getElementById("confirmAddTask");
    const taskList = document.getElementById("taskList");

    function showInput() {
        inputContainer.style.display = "block";
        addButton.style.display = "none";
        input.focus();
    }

    function hideInput() {
        inputContainer.style.display = "none";
        addButton.style.display = "block";
    }

    function addTask() {
        const taskText = input.value.trim();
        if (taskText === "") return;

        const taskDiv = document.createElement("div");
        const textSpan = document.createElement("span");
        textSpan.textContent = taskText;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.addEventListener("click", () => taskDiv.remove());

        taskDiv.appendChild(textSpan);
        taskDiv.appendChild(deleteButton);
        taskList.appendChild(taskDiv);

        input.value = "";
        hideInput();
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
});