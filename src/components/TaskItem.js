import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTask } from '../api/tasksApi';

const TaskItem = ({ task, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task.id);
      onDelete(task.id); // This will be a function passed from the parent component to handle state update
    }
  };

  const handleEdit = () => {
    navigate(`/tasks/${task.id}`);
  };

  return (
    <li>
      <div onClick={() => navigate(`/tasks/${task.id}`)}>
        <h2>{task.title}</h2>
      </div>
      <div>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
