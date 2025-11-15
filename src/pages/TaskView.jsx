import { Link, useParams } from "react-router-dom";

export default function TaskView({ tasks = [] }) {
  const { id } = useParams();
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <p className="text-gray-600 mb-4">Task not found.</p>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
        >
          ← Back to Tasks
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>

      <div className="flex flex-wrap gap-2 text-sm">
        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700">
          Priority: {task.priority}
        </span>
        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
          Due: {task.dueDate}
        </span>
        <span
          className={`px-3 py-1 rounded-full ${
            task.status === "Pending"
              ? "bg-red-100 text-red-700"
              : task.status === "In Progress"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          Status: {task.status}
        </span>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">
          Description
        </h3>
        <p className="text-gray-600 whitespace-pre-line">
          {task.description || "No description provided."}
        </p>
      </div>

      <div className="flex gap-3 pt-3">
        <Link
          to={`/edit/${task.id}`}
          className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
        >
          ✏ Edit
        </Link>
        <Link
          to="/"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          ← Back
        </Link>
      </div>
    </div>
  );
}
