import Link from 'next/link';
import css from './SidebarNotes.module.css';

const tags = [
  { slug: 'all', label: 'All notes' },
  { slug: 'Todo', label: 'Todo' },
  { slug: 'Work', label: 'Work' },
  { slug: 'Personal', label: 'Personal' },
  { slug: 'Meeting', label: 'Meeting' },
  { slug: 'Shopping', label: 'Shopping' },
];

export default function SidebarNotes() {
  return (
    <aside className={css.sidebar}>
      <ul className={css.menuList}>
        {tags.map(({ slug, label }) => (
          <li key={slug} className={css.menuItem}>
            {/* Ссылка ведет на динамический маршрут с выбранным тегом */}
            <Link href={`/notes/filter/${slug}`} className={css.menuLink}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}