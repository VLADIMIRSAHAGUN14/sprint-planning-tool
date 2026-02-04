// src/components/BacklogItems.jsx
import React, { useState, useEffect } from 'react';
import { sprintBacklogItems } from '../data/sprintData';

const BacklogItems = ({ data, onSelectItem, teamCapacity = 160 }) => {
  const [filteredItems, setFilteredItems] = useState(sprintBacklogItems);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [ownerFilter, setOwnerFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState(data?.selectedItems || []);

  // Sincronizar selectedItems con props
  useEffect(() => {
    if (data?.selectedItems) {
      setSelectedItems(data.selectedItems);
    }
  }, [data?.selectedItems]);

  // Aplicar filtros
  useEffect(() => {
    let items = sprintBacklogItems;

    if (priorityFilter !== 'all') {
      items = items.filter(item => 
        item.priority.toLowerCase() === priorityFilter.toLowerCase()
      );
    }

    if (ownerFilter !== 'all') {
      items = items.filter(item => 
        item.owner.toLowerCase().includes(ownerFilter.toLowerCase())
      );
    }

    setFilteredItems(items);
  }, [priorityFilter, ownerFilter]);

  // Manejar selección/deselección de items
  const handleSelectItem = (item) => {
    const isSelected = selectedItems.some(selected => selected.id === item.id);
    
    let newSelectedItems;
    if (isSelected) {
      newSelectedItems = selectedItems.filter(selected => selected.id !== item.id);
    } else {
      newSelectedItems = [...selectedItems, item];
    }
    
    setSelectedItems(newSelectedItems);
    
    // Notificar al componente padre si se proporciona la función callback
    if (onSelectItem) {
      onSelectItem(newSelectedItems);
    }
  };

  // Calcular estadísticas
  const totalPoints = selectedItems.reduce((sum, item) => sum + item.points, 0);
  const totalHours = selectedItems.reduce((sum, item) => sum + item.estimatedHours, 0);
  const capacityUsed = teamCapacity > 0 
    ? ((totalHours / teamCapacity) * 100).toFixed(1) 
    : '0';

  return (
    <div className="backlog-items">
      <h2>Product Backlog - Sprint 1 Selection</h2>
      
      <div className="backlog-filters">
        <div className="filter-group">
          <label>Filter by Priority:</label>
          <select 
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Filter by Owner:</label>
          <select 
            className="filter-select"
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
          >
            <option value="all">All Owners</option>
            <option value="vladimir">Vladimir</option>
            <option value="team">Dev Team</option>
            <option value="architect">Architect</option>
          </select>
        </div>
      </div>

      <div className="backlog-table-container">
        <table className="backlog-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Title</th>
              <th>Points</th>
              <th>Priority</th>
              <th>Estimated Hours</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => {
                const isSelected = selectedItems.some(selected => selected.id === item.id);
                return (
                  <tr 
                    key={item.id} 
                    className={`priority-${item.priority.toLowerCase()} ${isSelected ? 'selected' : ''}`}
                  >
                    <td>
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => handleSelectItem(item)}
                      />
                    </td>
                    <td className="item-id-cell">
                      <span className="item-id">{item.id}</span>
                    </td>
                    <td className="item-title-cell">
                      <strong>{item.title}</strong>
                      <p className="item-description">{item.description}</p>
                    </td>
                    <td className="points-cell">
                      <span className="points-badge">{item.points}</span>
                    </td>
                    <td className="priority-cell">
                      <span className={`priority-badge priority-${item.priority.toLowerCase()}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="hours-cell">{item.estimatedHours}h</td>
                    <td className="owner-cell">
                      <span className="owner-badge">{item.owner}</span>
                    </td>
                    <td className="status-cell">
                      <span className={`status-badge status-${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button 
                        className="action-btn view-btn" 
                        title="View Details"
                        onClick={() => console.log('View:', item.id)}
                      >
                        👁️
                      </button>
                      <button 
                        className="action-btn edit-btn" 
                        title="Edit"
                        onClick={() => console.log('Edit:', item.id)}
                      >
                        ✏️
                      </button>
                      <button 
                        className="action-btn split-btn" 
                        title="Split into Tasks"
                        onClick={() => console.log('Split:', item.id)}
                      >
                        🔨
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="no-items">
                  No backlog items found with the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="backlog-summary">
        <div className="summary-card">
          <h4>Selected Items</h4>
          <p className="summary-value">{selectedItems.length}</p>
        </div>
        <div className="summary-card">
          <h4>Total Points</h4>
          <p className="summary-value">{totalPoints}</p>
        </div>
        <div className="summary-card">
          <h4>Total Hours</h4>
          <p className="summary-value">{totalHours}h</p>
        </div>
        <div className="summary-card">
          <h4>Capacity Used</h4>
          <p className="summary-value">{capacityUsed}%</p>
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="acceptance-criteria-section">
          <h3>📝 Acceptance Criteria Details</h3>
          <div className="criteria-grid">
            {selectedItems.map(item => (
              <div key={item.id} className="criteria-card">
                <h4>{item.id} - {item.title}</h4>
                <ul className="criteria-list">
                  {item.acceptanceCriteria && item.acceptanceCriteria.map((criteria, idx) => (
                    <li key={idx}>
                      <input 
                        type="checkbox" 
                        id={`criteria-${item.id}-${idx}`}
                        onChange={(e) => console.log(`Criteria ${item.id}-${idx}:`, e.target.checked)}
                      />
                      <label htmlFor={`criteria-${item.id}-${idx}`}>{criteria}</label>
                    </li>
                  ))}
                </ul>
                <div className="criteria-owner">
                  Owner: <strong>{item.owner}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BacklogItems;
