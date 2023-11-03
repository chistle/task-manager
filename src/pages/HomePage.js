import React, { useState, useEffect } from 'react';
import { fetchTasks} from '../api/tasksApi';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await fetchTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Handle errors better in a real-world application
    }
  };

  const handleCreateNew = () => {
    navigate('/new')
  };

  const handleSave = async (taskData) => {
    setCreating(false);
    loadTasks();
  };

  const handleDelete = (deletedTaskId) => {
    setTasks(tasks.filter((task) => task.id !== deletedTaskId));
  };

  return (
    <div>
      {creating ? (
        <TaskForm onSave={handleSave} />
      ) : (
        <>
          <button onClick={handleCreateNew}>Create New Task</button>
          <TaskList tasks={tasks} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};

export default HomePage;
