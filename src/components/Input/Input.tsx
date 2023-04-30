import { HTMLInputTypeAttribute } from 'react';
import type { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputProps {
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  autoComplete?: string;
}

const Input = ({ type, name, placeholder, errorMessage, className, register, rules, autoComplete }: InputProps) => {
  return (
    <div className={className}>
      <input
        type={type}
        className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, rules)}
      />
      <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
    </div>
  );
};

export default Input;
