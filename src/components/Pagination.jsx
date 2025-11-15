export default function Pagination({ page, pages, setPage }) {
if (pages <= 1) return null;
return (
<div className="mt-4 flex gap-2">
{Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
<button
key={n}
className={`px-3 py-1 border rounded ${page === n ? "bg-blue-600 text-white" : ""}`}
onClick={() => setPage(n)}
>
{n}
</button>
))}
</div>
);
}