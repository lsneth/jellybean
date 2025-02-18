type PropTypes = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password' | 'username';
  autofocus?: boolean;
  placeholder?: string;
};

export default function TextInput({
  value,
  onChange,
  type = 'text',
  autofocus = true,
  placeholder = '',
}: PropTypes) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="border border-neutral-50 rounded-lg px-3 bg-neutral-900 my-1 mr-1 h-11 sm:h-10"
      autoFocus={autofocus}
      placeholder={placeholder}
    />
  );
}
