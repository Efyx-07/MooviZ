import { Icon } from '@iconify/react';
import './ViewMode.scss';

interface ViewModeProps<T extends string> {
  isActive: boolean;
  toggleView: (view: T) => void;
  firstView: T;
  secondView: T;
}

export default function ViewMode<T extends string>({
  isActive,
  toggleView,
  firstView,
  secondView,
}: ViewModeProps<T>) {
  return (
    <div className="viewMode-options">
      <p>Affichage: </p>
      <Icon
        icon="cil:movie"
        className={`view-mode-icon ${isActive ? 'active' : ''}`}
        onClick={() => toggleView(firstView)}
      />
      <Icon
        icon="octicon:graph-16"
        className={`view-mode-icon ${!isActive ? 'active' : ''}`}
        onClick={() => toggleView(secondView)}
      />
    </div>
  );
}
