import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForm({ mode = "create", tasks = [], onSubmit }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = mode === "edit";

  const [values, setValues] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    status: "Pending",
  });

  const [errors, setErrors] = useState({});

  // Load existing task in edit mode
  useEffect(() => {
    if (isEdit && id && tasks.length > 0) {
      const found = tasks.find((t) => t.id === id);
      if (found) {
        setValues({
          title: found.title || "",
          description: found.description || "",
          priority: found.priority || "Medium",
          dueDate: found.dueDate || "",
          status: found.status || "Pending",
        });
      }
    }
  }, [isEdit, id, tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!values.title.trim()) e.title = "Title is required";
    if (values.title.trim().length < 3)
      e.title = "Title must be at least 3 characters";
    if (!values.dueDate) e.dueDate = "Due date is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length > 0) return;

    if (isEdit) {
      onSubmit({ ...values, id });
    } else {
      onSubmit(values);
    }

    navigate("/"); // back to root (will show dashboard once tasks exist)
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {isEdit ? "Edit Task" : "Create Task"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            name="title"
            value={values.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Enter task title"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Describe the task..."
          />
        </div>

        {/* Priority, Due Date, Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={values.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={values.dueDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors.dueDate && (
              <p className="text-red-600 text-sm mt-1">{errors.dueDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={values.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700"
          >
            {isEdit ? "Update Task" : "Save Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
