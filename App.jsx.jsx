// src/App.jsx
import React, { useState } from 'react';
import SprintPlanning from './components/SprintPlanning';
import BacklogItems from './components/BacklogItems';
import TaskBreakdown from './components/TaskBreakdown';
import SprintMetrics from './components/SprintMetrics';
import DailyScrumBoard from './components/DailyScrumBoard';
import './styles/App.css';

function App() {
  const [currentView, setCurrentView] = useState('planning');
  const [sprintData, setSprintData] = useState({
    sprintNumber: 1,
    sprintGoal: '',
    selectedItems: [],
    teamCapacity: 320,
    sprintDuration: 10
  });

  const views = [
    { id: 'planning', label: '📋 Sprint Planning', component: <SprintPlanning data={sprintData} setData={setSprintData} /> },
    { id: 'backlog', label: '📦 Backlog Items', component: <BacklogItems data={sprintData} /> },
    { id: 'tasks', label: '🔨 Task Breakdown', component: <TaskBreakdown data={sprintData} /> },
    { id: 'metrics', label: '📊 Metrics', component: <SprintMetrics data={sprintData} /> },
    { id: 'daily', label: '📅 Daily Scrum', component: <DailyScrumBoard /> },
    { id: 'review', label: '✅ Review Prep', component: <SprintReview data={sprintData} /> }
  ];

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 SmartRoute - Sprint Planning Tool</h1>
        <p>Sprint 1: Fundamentos de Planificación y Arquitectura</p>
      </header>

      <nav className="navigation">
        {views.map(view => (
          <button
            key={view.id}
            className={`nav-btn ${currentView === view.id ? 'active' : ''}`}
            onClick={() => setCurrentView(view.id)}
          >
            {view.label}
          </button>
        ))}
      </nav>

      <main className="main-content">
        {views.find(v => v.id === currentView).component}
      </main>

      <footer className="app-footer">
        <p>SmartRoute Project Management System v1.0 • Sprint 1 • Capacity: {sprintData.teamCapacity}h</p>
      </footer>
    </div>
  );
}

export default App;