import { AuthNavigation } from '../AuthNavigation/AuthNavigation';
import TagsMenu from '../TagsMenu/TagsMenu';
import css from './Header.module.css';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">
        Note<span>Hub</span>
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link className={css.headerLink} href="/">
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <TagsMenu />
          </li>

          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;