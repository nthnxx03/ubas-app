import React, { useState, useEffect } from 'react';

const tasksData = [
  { id: 1, description: 'Task 1', assignee: 'John', deadline: '2024-08-01', status: 'Completed' },
  { id: 2, description: 'Task 2', assignee: 'Jane', deadline: '2024-08-01', status: 'Completed' },
  { id: 3, description: 'Task 3', assignee: 'Mike', deadline: '2024-08-03', status: 'Completed' },
  { id: 4, description: 'Task 4', assignee: 'Lisa', deadline: '2024-08-05', status: 'Completed' },
  { id: 5, description: 'Task 5', assignee: 'John', deadline: '2024-08-30', status: 'Pending' },
  { id: 6, description: 'Task 6', assignee: 'Jane', deadline: '2024-08-30', status: 'Pending' },
  { id: 7, description: 'Task 7', assignee: 'Mike', deadline: '2024-08-30', status: 'Pending' },
  { id: 8, description: 'Task 8', assignee: 'Lisa', deadline: '2024-08-30', status: 'Pending' },
  { id: 9, description: 'Task 9', assignee: 'John', deadline: '2024-08-30', status: 'Pending' },
  { id: 10, description: 'Task 10', assignee: 'Jane', deadline: '2024-08-31', status: 'Pending' }
];

const Task = ({ task, toggleStatus }) => {
  const { description, assignee, deadline, status } = task;
  return (
    <div className="task">
      <div className="task-item">Description: {description}</div>
      <div className="task-item">Assignee: {assignee}</div>
      {status !== 'Completed' && <div className="task-item">Deadline: {deadline}</div>}
      <div className="task-item">Status: {status}</div>
      <button onClick={() => toggleStatus(task.id)}>Toggle Status</button>
    </div>
  );
};

const Tasks = ({ tasks, toggleStatus }) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <Task key={index} task={task} toggleStatus={toggleStatus} />
      ))}
    </div>
  );
};

const SearchFilter = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search tasks..."
    />
  );
};

const TaskManager = () => {
  const [tasks, setTasks] = useState(tasksData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(tasksData);

  useEffect(() => {
    setFilteredTasks(
      tasks.filter((task) =>
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, tasks]);

  const toggleStatus = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, status: task.status === 'Pending' ? 'Completed' : 'Pending' }
        : task
    ));
  };

  return (
    <div>
      <h1>Task List</h1>
      <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Tasks tasks={filteredTasks} toggleStatus={toggleStatus} />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <TaskManager />
    </div>
  );
}

export default App;
