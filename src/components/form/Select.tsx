import { SelectHTMLAttributes } from 'react';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { title?: string };

export const Select: React.FC<SelectProps> = ({ title, className, name, children, ...props }) => {
  return (
    <>
      {title && <label htmlFor={name}>{title}:</label>}
      <select name={name} className={`border-2 ${className}`} {...props}>
        {children}
      </select>
    </>
  );
};
