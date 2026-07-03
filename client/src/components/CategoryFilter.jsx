import { categories } from '../data/categories'
import './CategoryFilter.css'

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="filter-pills" role="group" aria-label="Filter by category">
      <button
        className={`filter-pill ${!active ? 'is-active' : ''}`}
        onClick={() => onChange(null)}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c.id}
          className={`filter-pill ${active === c.id ? 'is-active' : ''}`}
          onClick={() => onChange(c.id)}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}
