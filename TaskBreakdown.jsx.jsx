// src/components/TaskBreakdown.jsx
import React, { useState } from 'react';
import { taskBreakdown } from '../data/sprintData';

const TaskBreakdown = ({ data }) => {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleItemExpansion = (itemId) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getTasksForItem = (itemId) => {
    return taskBreakdown[itemId] || [];
  };

  const calculateTaskTotals = () => {
    let totalTasks = 0;
    let totalHours = 0;
    
    Object.values(taskBreakdown).forEach(tasks => {
      totalTasks += tasks.length;
      totalHours += tasks.reduce((sum, task) => sum + task.hours, 0);
    });
    
    return { totalTasks, totalHours };
  };

  const totals = calculateTaskTotals();

  return (
    <div className="task-breakdown">
      <div className="breakdown-header">
        <h2>🔨 Task Breakdown - Sprint 1</h2>
        <div className="breakdown-stats">
          <span className="stat-badge">📋 {totals.totalTasks} Tasks</span>
          <span className="stat-badge">⏱️ {totals.totalHours} Hours</span>
          <span className="stat-badge">👥 {Object.keys(taskBreakdown).length} Backlog Items</span>
        </div>
      </div>

      <div className="breakdown-container">
        {data.selectedItems?.map(item => {
          const tasks = getTasksForItem(item.id);
          const isExpanded = expandedItems.includes(item.id);
          const itemTotalHours = tasks.reduce((sum, task) => sum + task.hours, 0);
          
          return (
            <div key={item.id} className="breakdown-item">
              <div 
                className="item-header" 
                onClick={() => toggleItemExpansion(item.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="header-left">
                  <span className="toggle-icon">
                    {isExpanded ? '▼' : '▶'}
                  </span>
                  <span className="item-id">{item.id}</span>
                  <h3 className="item-title">{item.title}</h3>
                </div>
                <div className="header-right">
                  <span className="hours-badge">{itemTotalHours}h</span>
                  <span className="tasks-badge">{tasks.length} tasks</span>
                  <span className="points-badge">{item.points} points</span>
                </div>
              </div>
              
              {isExpanded && (
                <div className="item-tasks">
                  <table className="tasks-table">
                    <thead>
                      <tr>
                        <th>Task Description</th>
                        <th>Owner</th>
                        <th>Estimated Hours</th>
                        <th>Day</th>
                        <th>Status</th>
                        <th>Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task, index) => (
                        <tr key={index}>
                          <td>
                            <input 
                              type="checkbox" 
                              id={`task-${item.id}-${index}`}
                              className="task-checkbox"
                            />
                            <label htmlFor={`task-${item.id}-${index}`}>
                              {task.description}
                            </label>
                          </td>
                          <td>
                            <span className="owner-tag">{task.owner}</span>
                          </td>
                          <td>
                            <span className="hours-tag">{task.hours}h</span>
                          </td>
                          <td>
                            <select className="day-select" defaultValue={task.day || ""}>
                              <option value="">Select Day</option>
                              {[...Array(data.sprintDuration)].map((_, i) => (
                                <option key={i+1} value={i+1}>Day {i+1}</option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <select className="status-select" defaultValue={task.status || "todo"}>
                              <option value="todo">To Do</option>
                              <option value="progress">In Progress</option>
                              <option value="review">In Review</option>
                              <option value="done">Done</option>
                            </select>
                          </td>
                          <td>
                            <div className="progress-bar-container">
                              <div 
                                className="progress-bar" 
                                style={{ width: `${task.progress || 0}%` }}
                              >
                                {task.progress || 0}%
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="2">
                          <strong>Item Total:</strong>
                        </td>
                        <td>
                          <strong>{itemTotalHours}h</strong>
                        </td>
                        <td colSpan="3">
                          <div className="progress-summary">
                            <span>Overall Progress: </span>
                            <div className="overall-progress">
                              <div 
                                className="overall-bar" 
                                style={{ width: '45%' }}
                              >
                                45%
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  
                  <div className="task-actions">
                    <button className="btn btn-sm btn-outline">
                      ➕ Add Task
                    </button>
                    <button className="btn btn-sm btn-outline">
                      🔄 Re-estimate
                    </button>
                    <button className="btn btn-sm btn-outline">
                      📤 Export Tasks
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="breakdown-summary">
        <div className="summary-section">
          <h4>📊 Task Distribution by Owner</h4>
          <div className="owner-distribution">
            {Object.entries(
              Object.values(taskBreakdown)
                .flat()
                .reduce((acc, task) => {
                  acc[task.owner] = (acc[task.owner] || 0) + task.hours;
                  return acc;
                }, {})
            ).map(([owner, hours]) => (
              <div key={owner} className="owner-dist">
                <span className="owner-name">{owner}</span>
                <div className="dist-bar-container">
                  <div 
                    className="dist-bar" 
                    style={{ 
                      width: `${(hours / totals.totalHours) * 100}%`,
                      backgroundColor: getOwnerColor(owner)
                    }}
                  >
                    {hours}h
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="summary-section">
          <h4>📅 Task Timeline</h4>
          <div className="timeline-chart">
            {[...Array(data.sprintDuration)].map((_, day) => {
              const dayTasks = Object.values(taskBreakdown)
                .flat()
                .filter(task => task.day === day + 1);
              const dayHours = dayTasks.reduce((sum, task) => sum + task.hours, 0);
              
              return (
                <div key={day} className="timeline-day">
                  <div className="day-label">Day {day + 1}</div>
                  <div className="day-bar-container">
                    <div 
                      className="day-bar" 
                      style={{ 
                        height: `${(dayHours / 8) * 100}%`,
                        backgroundColor: dayHours > 8 ? '#ef4444' : '#10b981'
                      }}
                      title={`${dayHours} hours`}
                    >
                      <span className="day-hours">{dayHours}h</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="breakdown-export">
        <button className="btn btn-primary">
          💾 Save Breakdown
        </button>
        <button className="btn btn-secondary">
          📋 Copy to Clipboard
        </button>
        <button className="btn btn-success">
          🖨️ Print Task Cards
        </button>
      </div>
    </div>
  );
};

// Helper function for owner colors
const getOwnerColor = (owner) => {
  const colors = {
    'PO': '#3b82f6',
    'BA': '#8b5cf6',
    'Arquitecto': '#10b981',
    'PM': '#f59e0b',
    'Dev Team': '#ef4444',
    'Tech Lead': '#06b6d4'
  };
  return colors[owner] || '#6b7280';
};

export default TaskBreakdown;