// src/components/BacklogItems.jsx
import React from 'react';
import { sprintBacklogItems } from '../data/sprintData';

const BacklogItems = ({ data }) => {
  return (
    <div className="backlog-items">
      <h2>Product Backlog - Sprint 1 Selection</h2>
      
      <div className="backlog-filters">
        <div className="filter-group">
          <label>Filter by Priority:</label>
          <select className="filter-select">
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Filter by Owner:</label>
          <select className="filter-select">
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
            {sprintBacklogItems.map(item => (
              <tr key={item.id} className={`priority-${item.priority.toLowerCase()}`}>
                <td>
                  <input 
                    type="checkbox" 
                    checked={data.selectedItems?.some(selected => selected.id === item.id)}
                    onChange={() => {}}
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
                  <span className={`status-badge status-${item.status}`}>
                    {item.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="action-btn view-btn" title="View Details">
                    👁️
                  </button>
                  <button className="action-btn edit-btn" title="Edit">
                    ✏️
                  </button>
                  <button className="action-btn split-btn" title="Split into Tasks">
                    🔨
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="backlog-summary">
        <div className="summary-card">
          <h4>Selected Items</h4>
          <p className="summary-value">{data.selectedItems?.length || 0}</p>
        </div>
        <div className="summary-card">
          <h4>Total Points</h4>
          <p className="summary-value">
            {data.selectedItems?.reduce((sum, item) => sum + item.points, 0) || 0}
          </p>
        </div>
        <div className="summary-card">
          <h4>Total Hours</h4>
          <p className="summary-value">
            {data.selectedItems?.reduce((sum, item) => sum + item.estimatedHours, 0) || 0}h
          </p>
        </div>
        <div className="summary-card">
          <h4>Capacity Used</h4>
          <p className="summary-value">
            {data.selectedItems?.length ? 
              ((data.selectedItems.reduce((sum, item) => sum + item.estimatedHours, 0) / data.teamCapacity) * 100).toFixed(1) + '%' 
              : '0%'}
          </p>
        </div>
      </div>

      <div className="acceptance-criteria-section">
        <h3>📝 Acceptance Criteria Details</h3>
        <div className="criteria-grid">
          {data.selectedItems?.map(item => (
            <div key={item.id} className="criteria-card">
              <h4>{item.id} - {item.title}</h4>
              <ul className="criteria-list">
                {item.acceptanceCriteria.map((criteria, idx) => (
                  <li key={idx}>
                    <input type="checkbox" id={`criteria-${item.id}-${idx}`} />
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
    </div>
  );
};

export default BacklogItems;