import './Dropdown.scss';
import { Icon } from '@iconify/react';

interface DropdownOption {
  label: string;
  value?: string;
  min?: number;
  max?: number;
}

interface DropdownProps {
  id: string;
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultLabel: string;
  options: DropdownOption[];
  'data-testid'?: string;
}

export default function Dropdown({
  id,
  selectedValue,
  onChange,
  defaultLabel,
  options,
  'data-testid': dataTestId,
}: DropdownProps) {
  return (
    <div className="dropdown-container">
      <select
        className="dropdown"
        id={id}
        value={selectedValue}
        onChange={onChange}
        data-testid={dataTestId}
      >
        <option value="">{defaultLabel}</option>
        {options.map((option) => (
          <option
            key={option.label}
            value={option.value || `${option.min}-${option.max}`}
          >
            {option.label}
          </option>
        ))}
      </select>
      <Icon
        icon="material-symbols-light:play-arrow"
        className="dropdown-icon"
      />
    </div>
  );
}
