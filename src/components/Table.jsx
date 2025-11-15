import { Link } from "react-router-dom";


export default function Table({ tasks, onDelete }) {
return (
<table className="w-full bg-white shadow rounded">
<thead>
<tr className="bg-gray-100">
<th className="p-3 text-left">Title</th>
<th className="p-3 text-left">Priority</th>
<th className="p-3 text-left">Due</th>
<th className="p-3 text-left">Status</th>
<th className="p-3">Actions</th>
</tr>
</thead>
<tbody>
{tasks.map((t) => (
<tr key={t.id} className="border-t">
<td className="p-3">
<Link className="text-blue-600" to={`/view/${t.id}`}>{t.title}</Link>
</td>
<td className="p-3">{t.priority}</td>
<td className="p-3">{t.dueDate}</td>
<td className="p-3">{t.status}</td>
<td className="p-3 flex gap-2">
<Link to={`/edit/${t.id}`} className="px-2 py-1 border rounded">Edit</Link>
<button onClick={() => onDelete(t.id)} className="px-2 py-1 border text-red-600 rounded">Delete</button>
</td>
</tr>
))}
</tbody>
</table>
);
}