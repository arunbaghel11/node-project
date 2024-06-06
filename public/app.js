document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const tasksList = document.getElementById('tasks-list');
    let isEditMode = false;
    let editTaskId = null;
  
    // Fetch and display tasks
    fetchTasks();
  
    // Handle form submission
    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('task-title').value;
      const description = document.getElementById('task-description').value;
  
      if (isEditMode) {
        const response = await fetch(`/tasks/${editTaskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
        });
  
        if (response.ok) {
          fetchTasks();
          taskForm.reset();
          isEditMode = false;
          editTaskId = null;
        } else {
          alert('Failed to update task');
        }
      } else {
        const response = await fetch('/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
        });
  
        if (response.ok) {
          fetchTasks();
          taskForm.reset();
        } else {
          alert('Failed to add task');
        }
      }
    });
  
    // Fetch tasks from the server
    async function fetchTasks() {
      const response = await fetch('/tasks');
      const tasks = await response.json();
      tasksList.innerHTML = '';
  
      tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.toggle('completed', task.isCompleted);
        taskItem.innerHTML = `
          <span>${task.title} - ${task.description}</span>
          <div>
            <button class="edit" data-id="${task._id}">Edit</button>
            <button class="complete" data-id="${task._id}">${task.isCompleted ? 'Completed' : 'Complete'}</button>
            <button class="delete" data-id="${task._id}">Delete</button>
          </div>
        `;
  
        // Handle edit button click
        taskItem.querySelector('.edit').addEventListener('click', () => {
          document.getElementById('task-title').value = task.title;
          document.getElementById('task-description').value = task.description;
          isEditMode = true;
          editTaskId = task._id;
        });
  
        // Handle complete button click
        taskItem.querySelector('.complete').addEventListener('click', async () => {
          const response = await fetch(`/tasks/${task._id}/complete`, { method: 'PATCH' });
          if (response.ok) fetchTasks();
        });
  
        // Handle delete button click
        taskItem.querySelector('.delete').addEventListener('click', async () => {
          const response = await fetch(`/tasks/${task._id}`, { method: 'DELETE' });
          if (response.ok) fetchTasks();
        });
  
        tasksList.appendChild(taskItem);
      });
    }
  });
  