export default function SortControl({ sortBy, setSortBy }) {
return (
<select
value={sortBy}
onChange={(e) => setSortBy(e.target.value)}
className="border px-3 py-2 rounded"
>
<option value="title">Title</option>
<option value="priority">Priority</option>
<option value="dueDate">Due Date</option>
<option value="status">Status</option>
</select>
);
}