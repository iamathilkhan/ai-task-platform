import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [inputText, setInputText] = useState('');
  const [operation, setOperation] = useState('uppercase');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const isAnyPendingOrRunning = tasks.some(t => t.status === 'pending' || t.status === 'running');
    let intervalId;
    
    if (isAnyPendingOrRunning) {
      intervalId = setInterval(fetchTasks, 3000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [tasks]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/tasks', { title, inputText, operation });
      setTitle('');
      setInputText('');
      setOperation('uppercase');
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRunTask = async (id) => {
    try {
      await axios.post(`/api/tasks/${id}/run`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>My Tasks</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn">
          {showForm ? 'Cancel' : 'Create Task'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreateTask} className="task-form">
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" required value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Input Text</label>
            <textarea className="form-control" required value={inputText} onChange={e => setInputText(e.target.value)} rows="3" />
          </div>
          <div className="form-group">
            <label>Operation</label>
            <select className="form-control" value={operation} onChange={e => setOperation(e.target.value)}>
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
              <option value="reverse">Reverse</option>
              <option value="wordcount">Word Count</option>
            </select>
          </div>
          <button type="submit" className="btn">Submit Task</button>
        </form>
      )}

      <div className="grid">
        {tasks.map(task => (
          <div key={task._id} className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1.2rem' }}>{task.title}</h3>
              <span className={`badge badge-${task.status}`}>{task.status}</span>
            </div>
            <div>
              <span className="badge badge-operation">{task.operation}</span>
            </div>
            
            <div className="card-actions">
              <button 
                onClick={() => handleRunTask(task._id)}
                className="btn btn-small"
                disabled={task.status === 'pending' || task.status === 'running'}
              >
                Run
              </button>
              <button onClick={() => navigate(`/tasks/${task._id}`)} className="btn btn-secondary btn-small">
                View
              </button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <p style={{ gridColumn: '1 / -1', color: 'var(--text-light)', marginTop: '2rem' }}>
            No tasks found. Create one to get started!
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
