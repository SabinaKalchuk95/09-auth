import Link from 'next/link';
import css from './SidebarNotes.module.css';

const SidebarNotes = () => {
  const tags = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

  return (
    <div>
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag === 'All' ? 'all' : tag}`}
              className={css.menuLink}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarNotes;
