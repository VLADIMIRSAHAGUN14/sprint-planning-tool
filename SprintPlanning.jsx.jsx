// src/components/SprintPlanning.jsx
import React, { useState, useEffect } from 'react';
import { sprintBacklogItems, teamMembers, definitionOfDone } from '../data/sprintData';

const SprintPlanning = ({ data, setData }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sprintGoal, setSprintGoal] = useState('');
  const [capacityUsed, setCapacityUsed] = useState(0);

  useEffect(() => {
    // Cargar datos iniciales
    setSprintGoal("Establecer los fundamentos de requerimientos, arquitectura técnica y planificación detallada necesarios para iniciar el desarrollo eficiente del sistema SmartRoute en sprints posteriores.");
    
    const initialItems = sprintBacklogItems.filter(item => 
      ['SR-REQ-003', 'SR-REQ-004', 'SR-ALC-005', 'SR-PLN-002', 
       'SR-UIX-009', 'SR-COM-011', 'SR-RIS-010'].includes(item.id)
    );
    setSelectedItems(initialItems);
    
    // Actualizar datos globales
    setData(prev => ({
      ...prev,
      sprintGoal: sprintGoal,
      selectedItems: initialItems
    }));
  }, []);

  const calculateMetrics = () => {
    const totalPoints = selectedItems.reduce((sum, item) => sum + item.points, 0);
    const totalHours = selectedItems.reduce((sum, item) => sum + item.estimatedHours, 0);
    const capacityPercentage = (totalHours / data.teamCapacity) * 100;
    
    setCapacityUsed(capacityPercentage);
    
    return { totalPoints, totalHours, capacityPercentage };
  };

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => {
      const isSelected = prev.some(item => item.id === itemId);
      if (isSelected) {
        return prev.filter(item => item.id !== itemId);
      } else {
        const itemToAdd = sprintBacklogItems.find(item => item.id === itemId);
        return [...prev, itemToAdd];
      }
    });
  };

  const metrics = calculateMetrics();

  return (
    <div className="sprint-planning">
      <div className="planning-header">
        <h2>Sprint 1 Planning Session</h2>
        <div className="sprint-info">
          <span className="badge">Sprint #{data.sprintNumber}</span>
          <span className="badge">{data.sprintDuration} days</span>
          <span className="badge">{data.teamCapacity}h capacity</span>
        </div>
      </div>

      <div className="sprint-goal-section">
        <h3>🎯 Sprint Goal</h3>
        <textarea
          className="goal-textarea"
          value={sprintGoal}
          onChange={(e) => {
            setSprintGoal(e.target.value);
            setData(prev => ({ ...prev, sprintGoal: e.target.value }));
          }}
          rows="3"
          placeholder="Define the sprint goal here..."
        />
      </div>

      <div className="capacity-section">
        <h3>📈 Capacity Planning</h3>
        <div className="capacity-meter">
          <div 
            className="capacity-bar" 
            style={{ width: `${metrics.capacityPercentage}%` }}
          >
            {metrics.capacityPercentage.toFixed(1)}%
          </div>
        </div>
        <div className="capacity-stats">
          <div className="stat">
            <span className="stat-label">Total Points:</span>
            <span className="stat-value">{metrics.totalPoints}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Total Hours:</span>
            <span className="stat-value">{metrics.totalHours}h</span>
          </div>
          <div className="stat">
            <span className="stat-label">Available:</span>
            <span className="stat-value">{data.teamCapacity - metrics.totalHours}h</span>
          </div>
        </div>
      </div>

      <div className="backlog-selection">
        <h3>📋 Select Backlog Items</h3>
        <div className="items-grid">
          {sprintBacklogItems.map(item => {
            const isSelected = selectedItems.some(selected => selected.id === item.id);
            
            return (
              <div 
                key={item.id}
                className={`backlog-item ${isSelected ? 'selected' : ''} priority-${item.priority.toLowerCase()}`}
                onClick={() => toggleItemSelection(item.id)}
              >
                <div className="item-header">
                  <input 
                    type="checkbox" 
                    checked={isSelected}
                    onChange={() => {}}
                    className="item-checkbox"
                  />
                  <span className="item-id">{item.id}</span>
                  <span className="item-points">{item.points} pts</span>
                </div>
                <h4 className="item-title">{item.title}</h4>
                <p className="item-description">{item.description}</p>
                <div className="item-footer">
                  <span className="item-priority">{item.priority}</span>
                  <span className="item-hours">{item.estimatedHours}h</span>
                </div>
                {isSelected && (
                  <div className="item-acceptance">
                    <strong>Acceptance Criteria:</strong>
                    <ul>
                      {item.acceptanceCriteria.map((criteria, idx) => (
                        <li key={idx}>{criteria}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="team-section">
        <h3>👥 Team Assignment</h3>
        <div className="team-grid">
          {teamMembers.map(member => (
            <div key={member.id} className="team-member">
              <div className="member-avatar">{member.avatar}</div>
              <div className="member-info">
                <h4>{member.name}</h4>
                <p className="member-role">{member.role}</p>
                <p className="member-capacity">{member.capacity}h available</p>
              </div>
              <div className="member-assignments">
                {selectedItems
                  .filter(item => item.owner === member.name)
                  .map(item => (
                    <span key={item.id} className="assignment-badge">
                      {item.id}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="definition-of-done">
        <h3>✅ Definition of Done</h3>
        <div className="dod-list">
          {definitionOfDone.map((item, index) => (
            <div key={index} className="dod-item">
              <input type="checkbox" id={`dod-${index}`} />
              <label htmlFor={`dod-${index}`}>{item}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="planning-actions">
        <button className="btn btn-primary" onClick={() => {
          alert(`Sprint Planning Saved!\n\nSelected Items: ${selectedItems.length}\nTotal Points: ${metrics.totalPoints}\nCapacity Used: ${metrics.capacityPercentage.toFixed(1)}%`);
        }}>
          💾 Save Sprint Plan
        </button>
        <button className="btn btn-secondary">
          📤 Export to PDF
        </button>
        <button className="btn btn-success">
          🚀 Start Sprint 1
        </button>
      </div>
    </div>
  );
};

export default SprintPlanning;