import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import TaskForm from "./pages/TaskForm";
import TaskView from "./pages/TaskView";

function App() {
  // Load tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks_v1");
    return saved ? JSON.parse(saved) : [];
  });

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks_v1", JSON.stringify(tasks));
  }, [tasks]);

  // Create new task
  const addTask = (task) => {
    setTasks((prev) => [...prev, { ...task, id: Date.now().toString() }]);
  };

  // Update existing task
  const updateTask = (updated) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <Router>
      <Header />
      <main className="min-h-screen bg-gray-100 pb-10">
        <Routes>
          {/* Root route: if no tasks → show create form, else dashboard */}
          <Route
            path="/"
            element={
              tasks.length === 0 ? (
                <div className="max-w-2xl mx-auto px-4 pt-6">
                  <TaskForm mode="create" onSubmit={addTask} />
                </div>
              ) : (
                <Home tasks={tasks} onDelete={deleteTask} />
              )
            }
          />

          {/* Create new task even after some exist */}
          <Route
            path="/task"
            element={
              <div className="max-w-2xl mx-auto px-4 pt-6">
                <TaskForm mode="create" onSubmit={addTask} />
              </div>
            }
          />

          {/* Edit existing task */}
          <Route
            path="/edit/:id"
            element={
              <div className="max-w-2xl mx-auto px-4 pt-6">
                <TaskForm mode="edit" tasks={tasks} onSubmit={updateTask} />
              </div>
            }
          />

          {/* View details */}
          <Route
            path="/view/:id"
            element={
              <div className="max-w-2xl mx-auto px-4 pt-6">
                <TaskView tasks={tasks} />
              </div>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
