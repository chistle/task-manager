import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTask } from '../api/tasksApi';
import TaskForm from '../components/TaskForm';
import { deleteTask } from '../api/tasksApi';

const TaskPage = () => {
  const [task, setTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { id } = useParams(); // Gets the :id param from the route
  const navigate = useNavigate();

  useEffect(() => {
    const getTask = async () => {
      try {
        const response = await fetchTask(id);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task details:', error);
        // Handle errors better in a real-world application
      }
    };

    getTask();
  }, [id]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/'); 
  };
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task.id);
      navigate('/');
    }
  };
  return (
    <div>
      {editMode ? (
        <TaskForm task={task} onSave={handleSave} />
      ) : (
        task && (
          <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: <strong className={`status-${task.status}`}>{task.status}</strong></p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        )
      )}
    </div>
  );
};

export default TaskPage;