interface ButtonProps {
  name: string;
  backgroundColor: string;
  color: string;
}

export default function Button({ name, backgroundColor, color }: ButtonProps) {
  return (
    <button
      type="submit"
      style={{ backgroundColor: backgroundColor, color: color }}
    >
      {name}
    </button>
  );
}
