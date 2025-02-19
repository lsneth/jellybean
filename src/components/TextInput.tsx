import { useRef } from 'react';

type PropTypes = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password' | 'username';
  autofocus?: boolean;
  placeholder?: string;
  squeeze?: boolean;
};

export default function TextInput({
  value,
  onChange,
  type = 'text',
  autofocus = true,
  placeholder = '',
  squeeze = false, // for mobile widths to shrink the width a bit when necessary
}: PropTypes) {
  // this prevents the keyboard from covering the text input on mobile devices, courtesy of ChatGPT haha
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFocus = () => {
    setTimeout(() => {
      inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`border border-neutral-50 rounded-lg px-3 bg-neutral-900 my-1 mr-1 ${
        squeeze ? 'w-44 max-[375px]:w-auto' : ''
      } h-11 sm:h-10`}
      autoFocus={autofocus}
      placeholder={placeholder}
      onFocus={handleFocus}
      ref={inputRef}
    />
  );
}
