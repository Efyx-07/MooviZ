import './Footer.scss';
import { currentYear } from '@/config';

export default function Footer() {
  const copyright = `© ${currentYear} MooviZ. Tous droits réservés.`;

  return (
    <footer>
      <p className="copyright">{copyright}</p>
    </footer>
  );
}
