# node-project

 



To-Do List Application

Overview

This project is a simple To-Do List application that allows users to manage their tasks. The application supports CRUD operations (Create, Read, Update, Delete) on tasks, including marking tasks as completed. It uses a Node.js backend with Express and MongoDB for data storage, and a frontend built with plain HTML, CSS, and JavaScript.

Features

Add new tasks with a title and optional description.
Edit existing tasks.
Mark tasks as completed.
Delete tasks.
Display a list of tasks fetched from the server.



Clone the repository:


git clone <https://github.com/arunbaghel11/node-project>

cd <repository-directory>
Install the dependencies:

Copy code
npm install
Start the MongoDB server:

Copy code
mongod


npm start
Open your browser and navigate to http://localhost:3000.

API Endpoints
POST /tasks - Create a new task

Request body: { "title": "Task Title", "description": "Task Description", "dueDate": "2023-12-31", "category": "Work" }
Response: Created task object
GET /tasks - Fetch all tasks

Response: Array of task objects
PUT /tasks/:id - Update a task

Request body: { "title": "Updated Title", "description": "Updated Description", "dueDate": "2023-12-31", "category": "Personal" }
Response: Updated task object

PATCH /tasks/:id/complete - Mark a task as completed

Response: Updated task object

DELETE /tasks/:id - Delete a task

Response: { "message": "Task deleted successfully" }

Frontend Functionality

Add Task: Fill in the task title and description, then click "Add Task" to create a new task.
Edit Task: Click the "Edit" button next to a task, modify the task details in the form, and click "Add Task" to save the changes.
Mark Complete: Click the "Complete" button next to a task to mark it as completed.
Delete Task: Click the "Delete" button next to a task to remove it from the list.
Dependencies
Backend:

Express
Mongoose
Body-Parser
Frontend:

Plain HTML, CSS, and JavaScript
License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
Express
MongoDB
Mongoose
