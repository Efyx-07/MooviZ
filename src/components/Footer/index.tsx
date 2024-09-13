import './Footer.scss';

export default function Footer() {
  const year = new Date().getFullYear();
  const copyright = `© ${year} Mooviz. Tous droits réservés.`;

  return (
    <footer>
      <p className="copyright">{copyright}</p>
    </footer>
  );
}
