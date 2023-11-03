import React from 'react';
import TaskForm from '../components/TaskForm';
import { useNavigate } from 'react-router-dom';

const CreateTaskPage = () => {
  const navigate = useNavigate();

  const handleSave = async (taskData) => {
    try {
      navigate('/'); 
    } catch (error) {
      console.error('Error creating the task:', error);
    }
  };

  return (
    <div>
      <h1>Create New Task</h1>
      <TaskForm onSave={handleSave} />
    </div>
  );
};

export default CreateTaskPage;
