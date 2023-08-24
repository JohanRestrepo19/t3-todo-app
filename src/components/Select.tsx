import { type SelectHTMLAttributes, forwardRef } from 'react'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options?: string[]
}

export default forwardRef<HTMLSelectElement, Props>(function Select(
  { label, options, ...props },
  ref
) {
  return (
    <div className="group mb-6 w-full">
      <label className="scale-75 text-sm text-gray-500 group-active:text-blue-600 dark:text-gray-400">
        {label}
      </label>
      <select
        {...props}
        ref={ref}
        className="block w-full rounded-md border border-gray-300 bg-transparent py-2 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-transparent dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        {options?.map(opt => (
          <option key={opt} value={opt} className="capitalize dark:bg-gray-600">
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
})
