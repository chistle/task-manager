import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../api/tasksApi';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({ task, onSave }) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    status: 'pending',
  });

  useEffect(() => {
    // Populate form if task data is provided (for edit)
    if (task) {
      setFormState({
        title: task.title,
        description: task.description,
        status: task.status,
      });
    }
  }, [task]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (task && task.id) {
        await updateTask(task.id, formState);
      } else {
        await createTask(formState);
      }
      onSave();
    } catch (error) {
      console.error('Error saving the task:', error);
    }
  };

  const handleCancel = () => {
    navigate('/'); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formState.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={formState.description}
        onChange={handleChange}
        required
      />

      <label htmlFor="status">Status</label>
      <select
        id="status"
        name="status"
        value={formState.status}
        onChange={handleChange}
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <button type="submit">{task ? 'Update Task' : 'Create Task'}</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default TaskForm;