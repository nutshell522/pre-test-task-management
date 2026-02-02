import { InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & { title?: string };

export const Input: React.FC<InputProps> = ({ title, className, name, ...props }) => {
  return (
    <>
      {title && <label htmlFor={name}>{title}:</label>}
      <input name={name} className={`border-2 ${className}`} {...props} />
    </>
  );
};
