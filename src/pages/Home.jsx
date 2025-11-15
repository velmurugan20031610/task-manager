import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

const Home = ({ tasks, onDelete }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        (task.description || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6">
      {/* HEADER + ACTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Your Tasks ✅
        </h1>

        <Link
          to="/task"
          className="inline-flex justify-center bg-sky-600 text-white px-4 py-2 rounded-lg shadow hover:bg-sky-700 transition"
        >
          ➕ Create New Task
        </Link>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="All">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* TASK CARDS */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
          No tasks match your search. Try creating a new one.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition p-5 border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {task.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-3">
                  {task.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                    Priority: {task.priority}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                    Due: {task.dueDate}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.status === "Pending"
                        ? "bg-red-100 text-red-700"
                        : task.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                <Link
                  to={`/edit/${task.id}`}
                  className="text-sm px-3 py-1 rounded-md bg-sky-500 text-white hover:bg-sky-600"
                >
                  ✏ Edit
                </Link>

                <Link
                  to={`/view/${task.id}`}
                  className="text-sm px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  👁 View
                </Link>

                <button
                  onClick={() => onDelete(task.id)}
                  className="text-sm px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
