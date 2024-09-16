import './FiltersForm.scss';
import Button from '../Shared/Button';

export default function FiltersForm() {
  return (
    <div className="filters-form-container">
      <h3>Vos critères de recherche</h3>
      <form>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <Button name="Appliquer les filtres" />
      </form>
    </div>
  );
}
