type PropTypes = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TextInput({ value, onChange }: PropTypes) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="border border-neutral-50 rounded-lg px-3 bg-neutral-900 mr-1"
      autoFocus
    />
  );
}
