interface LegitInputProps {
  label: string;
  placeholder: string;
  type: string;
  name: string;
  required?: boolean;
}

export function LegitInput({
  label,
  placeholder,
  type,
  name,
  required,
}: LegitInputProps) {
  return (
    <div className="space-y-1 w-full">
      <label htmlFor="name" className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-gray-700 pb-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}
