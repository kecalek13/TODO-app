function addTask() {
    var taskInput = document.querySelector('input[name="task"]');
    var taskToAdd = taskInput.value;

    if (taskToAdd) {
        document.getElementById('task-list').innerHTML += `
            <li id="task">
                <input type="checkbox" name="isDone" id="isDone">
                <span class="task">${taskToAdd}</span>
                <button id="edit">Edit</button>
                <button id="delete">Remove</button>
            </li>`;
    }
    taskInput.value = '';
}

document.getElementById('task-list').addEventListener('change', function(e) {
    if (e.target && e.target.name === 'isDone') {
        var taskText = e.target.nextElementSibling;
        if (e.target.checked) {
            taskText.style.textDecoration = 'line-through';
            taskText.style.color = 'gray';
        } else {
            taskText.style.textDecoration = 'none';
            taskText.style.color = '#fff';
        }
    }
});

document.getElementById('addTask').addEventListener('click', function() {
    addTask();
});

document.querySelector('input[name="task"]').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

document.getElementById('task-list').addEventListener('click', function(e) {
    if (e.target && e.target.id === 'edit') {
        var taskText = e.target.previousElementSibling;
        var input = document.createElement('input');
        input.type = 'text';
        input.style.width = '100%';
        input.style.height = '30px';
        input.style.background = 'none';
        input.style.border = '2px solid rgb(255, 0, 76)';
        input.style.color = '#fff';
        input.style.outline = 'none';
        input.style.padding = '5px'; 
        input.style.marginRight = '10px';
        input.style.borderRadius = '25px';
        input.value = taskText.textContent;
        taskText.replaceWith(input);
        input.focus();

        input.addEventListener('blur', function() {
            taskText.textContent = input.value;
            input.replaceWith(taskText);
        });

        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                taskText.textContent = input.value;
                input.replaceWith(taskText);
            }
        });
    } else if (e.target && e.target.id === 'delete') {
        e.target.parentElement.remove();
    }
});

document.getElementById('delete-all-btn').addEventListener('click', function() {
    document.getElementById('task-list').innerHTML = '';
});

window.addEventListener('beforeunload', function() {
    var tasks = [];
    document.querySelectorAll('#task-list li').forEach(function(task) {
        var taskText = task.querySelector('.task').textContent;
        var isDone = task.querySelector('input[name="isDone"]').checked;
        tasks.push({ text: taskText, isDone: isDone });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
});

window.addEventListener('load', function() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(function(task) {
            var taskHtml = `
                <li id="task">
                    <input type="checkbox" name="isDone" id="isDone"${task.isDone ? ' checked' : ''}>
                    <span class="task" style="text-decoration:${task.isDone ? 'line-through' : 'none'}; color:${task.isDone ? 'gray' : '#fff'};">${task.text}</span>
                    <button id="edit">Edit</button>
                    <button id="delete">Remove</button>
                </li>`;
            document.getElementById('task-list').innerHTML += taskHtml;
        });
    }
});
