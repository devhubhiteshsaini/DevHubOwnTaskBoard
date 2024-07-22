document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function showForm() {
    document.getElementById('taskFormModal').classList.remove('hidden');
}

function hideForm() {
    document.getElementById('taskFormModal').classList.add('hidden');
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = "bg-gray-100 p-4 rounded flex justify-between items-center";
      taskItem.innerHTML = `
    <div>
        <h3 class="text-lg font-bold">${task.title}</h3>
        <p>${task.description}</p>
        <p>Given Time: ${task.givenTime} hours</p>
        <p>Start Time: ${task.startTime}</p>
        <p>End Time: ${task.endTime || 'N/A'}</p>
        <p>Total Time: ${task.totalTime || 'N/A'}</p>
        <p class="${task.status === 'pending' ? 'bg-gray-500' : 'bg-green-500'}">Status: ${task.status}</p>
    </div>
    <div class="flex flex-col gap-4">
        <button class="bg-green-500 text-white px-2 py-1 rounded mr-2" onclick="changeStatus(${index})">Change Status</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteTask(${index})">Delete</button>
    </div>
`;
taskList.appendChild(taskItem);

      
    });
}

function addTask(event) {
    event.preventDefault();

    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskGivenTime = document.getElementById('taskGivenTime').value;

    const newTask = {
        title: taskTitle,
        description: taskDescription,
        givenTime: taskGivenTime,
        startTime: new Date().toLocaleString(),
        endTime: null,
        totalTime: null,
        status: 'pending'
    };

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    document.getElementById('taskForm').reset();
    hideForm();
    loadTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function changeStatus(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks[index];

    if (task.status === 'pending') {
        task.status = 'complete';
        task.endTime = new Date().toLocaleString();
        task.totalTime = ((new Date(task.endTime) - new Date(task.startTime)) / (1000 * 60 * 60)).toFixed(2) + ' hours';
    } else {
        task.status = 'pending';
        task.endTime = null;
        task.totalTime = null;
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}
