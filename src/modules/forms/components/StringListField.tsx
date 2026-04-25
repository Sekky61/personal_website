type StringListFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helperText: string;
};

export function StringListField({
  label,
  value,
  onChange,
  helperText,
}: StringListFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="label-large font-semibold">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="surface-container-high shape-medium min-h-32 resize-y border border-outline/50 px-4 py-3 outline-none transition-colors focus:border-primary"
      />
      <span className="body-small text-on-surface-variant">{helperText}</span>
    </label>
  );
}
