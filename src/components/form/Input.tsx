import { forwardRef, type InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  errorMsg?: string
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, errorMsg, ...props },
  ref
) {
  return (
    <div className="group relative z-0 mb-6 w-full">
      <input
        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-gray-400 dark:focus:border-blue-500"
        placeholder=" "
        {...props}
        ref={ref}
      />
      <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm capitalize text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500">
        {label}
      </label>
      {errorMsg && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errorMsg}
        </p>
      )}
    </div>
  )
})
