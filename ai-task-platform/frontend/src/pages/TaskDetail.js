import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  const fetchTask = async () => {
    try {
      const res = await axios.get(`/api/tasks/${id}`);
      setTask(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  useEffect(() => {
    let intervalId;
    if (task && (task.status === 'pending' || task.status === 'running')) {
      intervalId = setInterval(fetchTask, 3000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [task]);

  if (!task) return <div className="container">Loading task...</div>;

  return (
    <div className="container">
      <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" style={{ marginBottom: '2rem' }}>
        &larr; Back to Dashboard
      </button>

      <div className="task-detail">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <h2 style={{margin: 0}}>{task.title}</h2>
          <span className={`badge badge-${task.status}`}>{task.status}</span>
        </div>

        <div className="task-section">
          <h3>Operation</h3>
          <span className="badge badge-operation mt-1">{task.operation}</span>
        </div>

        <div className="task-section mt-4">
          <h3>Input Text</h3>
          <div className="task-pre">{task.inputText}</div>
        </div>

        {task.result && (
          <div className="task-section mt-4">
            <h3>Result</h3>
            <div className="task-pre" style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', borderWidth: '1px', borderStyle: 'solid' }}>
              {task.result}
            </div>
          </div>
        )}

        <div className="task-section mt-4">
          <h3>Activity Logs</h3>
          {task.logs && task.logs.length > 0 ? (
            <ul className="logs-timeline mt-1">
              {task.logs.map((log, index) => (
                <li key={index}>
                  <span className="log-time">{new Date(log.timestamp).toLocaleString()}</span>
                  <span className="log-msg">{log.message}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{color: 'var(--text-light)', marginTop: '0.5rem'}}>No logs available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
