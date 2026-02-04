// src/components/SprintPlanning.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { sprintBacklogItems, teamMembers, definitionOfDone } from '../data/sprintData';

const SprintPlanning = ({ data, setData }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sprintGoal, setSprintGoal] = useState('');
  const [capacityUsed, setCapacityUsed] = useState(0);
  const [metrics, setMetrics] = useState({ 
    totalPoints: 0, 
    totalHours: 0, 
    capacityPercentage: 0 
  });

  // Función para calcular métricas
  const calculateMetrics = useCallback(() => {
    const totalPoints = selectedItems.reduce((sum, item) => sum + (item.points || 0), 0);
    const totalHours = selectedItems.reduce((sum, item) => sum + (item.estimatedHours || 0), 0);
    const teamCapacity = data?.teamCapacity || 0;
    const capacityPercentage = teamCapacity > 0 ? (totalHours / teamCapacity) * 100 : 0;
    
    return { totalPoints, totalHours, capacityPercentage };
  }, [selectedItems, data?.teamCapacity]);

  useEffect(() => {
    // Cargar datos iniciales
    const initialGoal = "Establecer los fundamentos de requerimientos, arquitectura técnica y planificación detallada necesarios para iniciar el desarrollo eficiente del sistema SmartRoute en sprints posteriores.";
    setSprintGoal(initialGoal);
    
    const initialItems = sprintBacklogItems.filter(item => 
      ['SR-REQ-003', 'SR-REQ-004', 'SR-ALC-005', 'SR-PLN-002', 
       'SR-UIX-009', 'SR-COM-011', 'SR-RIS-010'].includes(item.id)
    );
    setSelectedItems(initialItems);
    
    // Actualizar datos globales
    setData(prev => ({
      ...prev,
      sprintGoal: initialGoal,
      selectedItems: initialItems
    }));
  }, [setData]);

  // Actualizar métricas cuando cambian los items seleccionados
  useEffect(() => {
    const newMetrics = calculateMetrics();
    setMetrics(newMetrics);
    setCapacityUsed(newMetrics.capacityPercentage);
  }, [selectedItems, calculateMetrics]);

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => {
      const isSelected = prev.some(item => item.id === itemId);
      if (isSelected) {
        return prev.filter(item => item.id !== itemId);
      } else {
        const itemToAdd = sprintBacklogItems.find(item => item.id === itemId);
        return itemToAdd ? [...prev, itemToAdd] : prev;
      }
    });
  };

  // Manejar cambio en el objetivo del sprint
  const handleSprintGoalChange = (e) => {
    const newGoal = e.target.value;
    setSprintGoal(newGoal);
    setData(prev => ({ 
      ...prev, 
      sprintGoal: newGoal 
    }));
  };

  // Función para guardar el plan
  const saveSprintPlan = () => {
    alert(`Sprint Planning Saved!\n\nSelected Items: ${selectedItems.length}\nTotal Points: ${metrics.totalPoints}\nCapacity Used: ${metrics.capacityPercentage.toFixed(1)}%`);
    
    // Aquí podrías añadir lógica para guardar en localStorage o API
    localStorage.setItem('sprintPlan', JSON.stringify({
      sprintGoal,
      selectedItems,
      metrics,
      timestamp: new Date().toISOString()
    }));
  };

  return (
    <div className="sprint-planning">
      <div className="planning-header">
        <h2>Sprint 1 Planning Session</h2>
        <div className="sprint-info">
          <span className="badge">Sprint #{data?.sprintNumber || 1}</span>
          <span className="badge">{data?.sprintDuration || 14} days</span>
          <span className="badge">{data?.teamCapacity || 0}h capacity</span>
        </div>
      </div>

      <div className="sprint-goal-section">
        <h3>🎯 Sprint Goal</h3>
        <textarea
          className="goal-textarea"
          value={sprintGoal}
          onChange={handleSprintGoalChange}
          rows="3"
          placeholder="Define the sprint goal here..."
        />
      </div>

      <div className="capacity-section">
        <h3>📈 Capacity Planning</h3>
        <div className="capacity-meter">
          <div 
            className="capacity-bar" 
            style={{ width: `${Math.min(metrics.capacityPercentage, 100)}%` }}
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
            <span className="stat-value">
              {Math.max(0, (data?.teamCapacity || 0) - metrics.totalHours)}h
            </span>
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
                className={`backlog-item ${isSelected ? 'selected' : ''} priority-${item.priority?.toLowerCase() || 'medium'}`}
                onClick={() => toggleItemSelection(item.id)}
              >
                <div className="item-header">
                  <input 
                    type="checkbox" 
                    checked={isSelected}
                    onChange={() => toggleItemSelection(item.id)}
                    className="item-checkbox"
                  />
                  <span className="item-id">{item.id}</span>
                  <span className="item-points">{item.points || 0} pts</span>
                </div>
                <h4 className="item-title">{item.title || 'Untitled Item'}</h4>
                <p className="item-description">{item.description || ''}</p>
                <div className="item-footer">
                  <span className="item-priority">{item.priority || 'MEDIUM'}</span>
                  <span className="item-hours">{item.estimatedHours || 0}h</span>
                </div>
                {isSelected && item.acceptanceCriteria && (
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
              <div className="member-avatar">{member.avatar || '👤'}</div>
              <div className="member-info">
                <h4>{member.name || 'Unnamed Member'}</h4>
                <p className="member-role">{member.role || 'Team Member'}</p>
                <p className="member-capacity">{member.capacity || 0}h available</p>
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
              <input 
                type="checkbox" 
                id={`dod-${index}`} 
                onChange={(e) => {
                  // Manejar cambio en checkbox DoD
                  console.log(`DoD item ${index} checked:`, e.target.checked);
                }}
              />
              <label htmlFor={`dod-${index}`}>{item || 'Empty DoD item'}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="planning-actions">
        <button className="btn btn-primary" onClick={saveSprintPlan}>
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
