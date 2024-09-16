import './Button.scss';
import { MouseEventHandler } from 'react';

interface ButtonProps {
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ name, onClick }: ButtonProps) {
  return (
    <button type="submit" onClick={onClick}>
      {name}
    </button>
  );
}
