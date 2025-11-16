import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import TaskForm from "./pages/TaskForm";
import TaskView from "./pages/TaskView";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks_v1");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks_v1", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, { ...task, id: Date.now().toString() }]);
  };

  const updateTask = (updated) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <Router basename="/task-manager">
      <Header />
      <main className="min-h-screen bg-gray-100 pb-10">
        <Routes>
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

          <Route
            path="/task"
            element={
              <div className="max-w-2xl mx-auto px-4 pt-6">
                <TaskForm mode="create" onSubmit={addTask} />
              </div>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <div className="max-w-2xl mx-auto px-4 pt-6">
                <TaskForm mode="edit" tasks={tasks} onSubmit={updateTask} />
              </div>
            }
          />

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
