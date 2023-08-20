import Head from 'next/head'
import { type SelectHTMLAttributes, forwardRef } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

import Input from '@/components/Input'
import { api, type RouterInputs } from '@/utils/api'

type Inputs = RouterInputs['todos']['create']

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options?: string[]
}

const Select = forwardRef<HTMLSelectElement, Props>(function Select({
  label,
  options,
  ...props
}: Props) {
  return (
    <div className="group mb-6 w-full">
      <label className="scale-75 text-sm text-gray-500 group-active:text-blue-600 dark:text-gray-400">
        {label}
      </label>
      <select
        {...props}
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

export default function Home() {
  const { mutate, isLoading: isPosting } = api.todos.create.useMutation()
  const { data: priorities } = api.todos.getTodoPriorities.useQuery()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const handleSubmitForm: SubmitHandler<Inputs> = data => {
    console.log('data to be submitted: ', data)
    mutate(data)
  }

  return (
    <>
      <Head>
        <title>TODO App</title>
        <meta name="description" content="todo app using t3 stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-full flex-col items-center gap-8 p-16 sm:flex-row sm:flex-wrap sm:items-start sm:justify-evenly">
        {/* Form */}
        <form
          className="scrollbar block max-h-full basis-5/12 overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <h3 className="mb-2 text-xl font-medium">New Todo</h3>
          <Input
            label="Title"
            {...register('title')}
            errorMsg={errors.title?.message}
          />
          <Input
            label="Description"
            {...register('description')}
            errorMsg={errors.description?.message}
          />

          <Input label="Target date" type="date" />

          <Select
            label="Priority"
            options={priorities}
            {...register('priority')}
          />

          {/*TODO: Must be a multiselect  */}
          <Select label="Category" options={[]} />

          <button
            type="submit"
            className="text center dark.hover:bg-blue-700 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:focus:ring-blue-800 sm:w-auto"
            disabled={isPosting}
          >
            Submit
          </button>
        </form>
        {/* Todo list */}
        <div className="scrollbar block max-h-full basis-5/12 overflow-hidden overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"></div>
      </main>
    </>
  )
}
