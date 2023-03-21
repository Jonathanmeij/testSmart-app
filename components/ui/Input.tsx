/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
interface InputProps {
  className?: string;
  placeholder?: string;
  name: string;
  error?: string;
  type?: string;
  register: any;
  options?: any;
  fullWidth?: boolean;
  defaultValue?: string;
  rows?: number;
  isRequired?: boolean;
}

export function Input({
  className,
  placeholder,
  error,
  type,
  register,
  name,
  options,
  fullWidth,
  defaultValue,
  isRequired,
}: InputProps) {
  return (
    <div className="flex w-full flex-col ">
      <label htmlFor={name} className="mb-2 block text-sm font-medium  ">
        {name} {isRequired && <span className="text-red-700">*</span>}
      </label>
      <input
        id={name}
        defaultValue={defaultValue}
        type={type}
        {...register(name, {
          ...options,
        })}
        placeholder={placeholder}
        className={`text-md block w-full max-w-md rounded-lg border  border-san-marino-200  bg-san-marino-50 p-2.5  
                 placeholder-gray-400 focus:outline-none focus:ring-2 
                focus:ring-san-marino-500 ${className} ${
          fullWidth ? "w-full" : ""
        }
                ${error ? "border-red-400 " : ""}
                `}
      />
      {error && <span className="w-full text-sm text-red-400">{error}</span>}
    </div>
  );
}

export function TextArea({
  className,
  placeholder,
  error,
  type,
  register,
  name,
  options,
  fullWidth,
  defaultValue,
  rows,
  isRequired,
}: InputProps) {
  return (
    <div className="flex w-full flex-col ">
      <label htmlFor={name} className="mb-2 block text-sm font-medium ">
        {name} {isRequired && <span className="text-red-700">*</span>}
      </label>
      <textarea
        id={name}
        defaultValue={defaultValue}
        rows={rows}
        {...register(name, {
          ...options,
        })}
        placeholder={placeholder}
        className={`text-md block w-full max-w-md rounded-lg border border-san-marino-200 bg-san-marino-50  p-2.5 placeholder-gray-400   focus:outline-none focus:ring-2 focus:ring-san-marino-500 ${className} ${
          fullWidth ? "w-full" : ""
        }
                ${error ? "border-red-400 " : ""}
                `}
      />
      {error && <span className="w-full text-sm text-red-400">{error}</span>}
    </div>
  );
}
