import { api, type RouterInputs } from '@/utils/api'
import Head from 'next/head'
import { useForm, type SubmitHandler } from 'react-hook-form'
import Input from '@/components/Input'
import Select from '@/components/Select'

type TodoInputs = RouterInputs['todos']['create']

export default function Home() {
  const { mutate, isLoading: isPosting } = api.todos.create.useMutation()
  const { data: priorities } = api.todos.getTodoPriorities.useQuery()
  const { data: categories } = api.categories.getAllByUserId.useQuery()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TodoInputs>()

  const handleSubmitForm: SubmitHandler<TodoInputs> = data => {
    console.log('data to be submitted: ', data)
    mutate(data)
  }

  console.log('info from trpc queries: ', { priorities, categories })

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
