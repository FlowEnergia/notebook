document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Carregar tarefas ao iniciar a página
    loadTasks();

    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && taskInput.value.trim() !== '') {
            addTask(taskInput.value.trim());
            taskInput.value = '';

            // Salvar tarefas no localStorage após adicionar uma nova tarefa
            saveTasks();
        }
    });

    taskList.addEventListener('click', function (e) {
        const target = e.target;

        // Editar tarefa ao clicar no texto da tarefa
        if (target.tagName === 'SPAN') {
            editTask(target);
        }

        // Remover tarefa ao clicar no botão "Remover"
        if (target.tagName === 'BUTTON') {
            removeTask(target.parentNode);
            saveTasks(); // Salvar tarefas após remover
        }
    });

    // Adicionar funcionalidade de organização da ordem das tarefas
    new Sortable(taskList, {
        animation: 150,
        onEnd: function (e) {
            saveTasks(); // Salvar tarefas após reordenar
        },
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent;

        li.appendChild(taskTextSpan);
        li.appendChild(removeButton);

        taskList.appendChild(li);
        bindTaskEvents(li);
    }

    function editTask(taskTextSpan) {
        const editText = prompt('Editar tarefa:', taskTextSpan.textContent);
        if (editText !== null) {
            taskTextSpan.textContent = editText;
            saveTasks();
        }
    }

    function removeTask(element) {
        const li = element;
        taskList.removeChild(li);
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(task => task.firstChild.textContent.trim());
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            taskList.innerHTML = '';
            JSON.parse(savedTasks).forEach(taskText => {
                addTask(taskText);
            });
        }
    }

    function bindTaskEvents(task) {
        const taskTextSpan = task.querySelector('span');
        taskTextSpan.addEventListener('click', function () {
            editTask(taskTextSpan);
        });

        const removeButton = task.querySelector('button');
        removeButton.addEventListener('click', function () {
            removeTask(task);
            saveTasks();
        });
    }
});