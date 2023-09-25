import { type SelectHTMLAttributes } from 'react'
import { type UseFormRegisterReturn } from 'react-hook-form'

type Options<Type> = {
  [Property in keyof Type]: Type[Property]
} & { name: string; value: string }

interface Props<T> extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options?: Options<T>[]
  errorMsg?: string
  registerProps: UseFormRegisterReturn
}

export default function Select<T>({
  label,
  options,
  errorMsg,
  registerProps,
  ...props
}: Props<T>) {
  return (
    <div className="group mb-6 w-full">
      <label className="scale-75 text-sm text-gray-500 group-active:text-blue-600 dark:text-gray-400">
        {label}
      </label>
      <select
        {...props}
        className="block w-full rounded-md border border-gray-300 bg-transparent py-2 text-sm capitalize text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-transparent dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        {...registerProps}
        defaultValue=""
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options?.map(opt => (
          <option
            key={opt.value}
            value={opt.value}
            className="capitalize dark:bg-gray-600"
            defaultValue={opt.value}
          >
            {opt.name}
          </option>
        ))}
      </select>
      {errorMsg && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errorMsg}
        </p>
      )}
    </div>
  )
}
