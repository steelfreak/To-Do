document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');

  // Load tasks from localStorage on page load
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(function(task) {
    addTask(task);
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const task = input.value.trim();
    if (task !== '') {
      addTask(task);
      input.value = '';
      input.focus();
      saveTasks();
    }
  });

  function addTask(task) {
    const li = document.createElement('li');
    const text = document.createElement('span');
    text.textContent = task;
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';

    deleteBtn.addEventListener('click', function() {
      li.remove();
      saveTasks();
    });

    editBtn.addEventListener('click', function() {
      const newTask = prompt('Enter the new task:', task);
      if (newTask !== null && newTask.trim() !== '') {
        text.textContent = newTask.trim();
        saveTasks();
      }
    });

    li.appendChild(text);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  }

  function saveTasks() {
    const tasks = Array.from(list.children).map(function(li) {
      return li.firstChild.textContent;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});