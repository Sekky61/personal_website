type StringFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function StringField({
  label,
  value,
  onChange,
  placeholder,
}: StringFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="label-large font-semibold">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="surface-container-high shape-medium min-h-12 border border-outline/50 px-4 py-3 outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}
