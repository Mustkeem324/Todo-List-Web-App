let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <label class="cr-wrapper">
                <input name="radio" type="radio" type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                <span>${task.text}</span>
            </label>
            <button onclick="deleteTask(${index})" class="delete-btn"><img  src="./images/icon-cross.svg" ></button>
        `;
        taskList.appendChild(taskItem);
    });
    document.getElementById('totalTasks').textContent = tasks.length;
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

let isDarkMode = false;

function toggleTheme() {
    const container = document.querySelector('.container');
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        container.classList.add('dark-theme');
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        document.getElementById('themeImg').src = 'images/icon-moon.svg'; // Path to moon SVG
        document.getElementById('themeImg').alt = 'Moon';
    } else {
        container.classList.remove('dark-theme');
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        document.getElementById('themeImg').src = 'images/icon-sun.svg'; // Path to sun SVG
        document.getElementById('themeImg').alt = 'Sun';
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const toggleThemeBtn = document.getElementById('toggleThemeBtn');

    addTaskBtn.addEventListener('click', addTask);
    clearCompletedBtn.addEventListener('click', clearCompleted);
    toggleThemeBtn.addEventListener('click', toggleTheme);

    renderTasks(); 
    loadTasks();
});
