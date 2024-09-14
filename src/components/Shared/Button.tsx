import { MouseEventHandler } from 'react';

interface ButtonProps {
  name: string;
  backgroundColor: string;
  color: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  name,
  backgroundColor,
  color,
  onClick,
}: ButtonProps) {
  return (
    <button
      type="submit"
      style={{ backgroundColor: backgroundColor, color: color }}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
