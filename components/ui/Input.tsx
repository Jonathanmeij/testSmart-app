import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

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
  noLabel?: boolean;
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
  noLabel,
}: InputProps) {
  return (
    <div className="flex w-full flex-col ">
      {!noLabel && (
        <label htmlFor={name} className="mb-2 block text-sm font-medium  ">
          {name} {isRequired && <span className="text-red-700">*</span>}
        </label>
      )}
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
                ${error ? "border-red-300 " : ""}
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

interface ListBoxProps {
  selected: number;
  setSelected: (selected: number) => void;
  options: { id: number; value: string }[];
}
export function ListBox({ selected, setSelected, options }: ListBoxProps) {
  return (
    <Listbox
      as="div"
      className="relative w-full max-w-md"
      value={selected}
      onChange={setSelected}
    >
      <Listbox.Button className="flex w-full items-center justify-between rounded-lg border border-san-marino-200  p-2.5 placeholder-gray-400 ">
        <span>{selected + 1}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          className=" -rotate-90"
        >
          <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
        </svg>
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options
          as="div"
          className="absolute bottom-14 w-full  list-none rounded bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none "
        >
          {options.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option.id}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-2 ${
                  active
                    ? "bg-san-marino-100 text-san-marino-900"
                    : "text-gray-900"
                }`
              }
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block  truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {option.value}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z" />
                      </svg>
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
