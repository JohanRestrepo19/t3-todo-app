import Head from 'next/head'
import Input from '@/components/Input'
import { useForm, type SubmitHandler } from 'react-hook-form'

type Inputs = {
  title: string
  desc: string
}

export default function Home() {
  const { register, handleSubmit, watch } = useForm<Inputs>()

  const handleSubmitForm: SubmitHandler<Inputs> = data => {
    console.log('hola', data)
  }

  console.log(watch('title'))

  return (
    <>
      <Head>
        <title>TODO App</title>
        <meta name="description" content="todo app using t3 stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-full flex-col items-center gap-8 p-16 sm:flex-row sm:flex-wrap sm:items-start sm:justify-evenly">
        {/* Form */}:{' '}
        <form
          className="scrollbar block max-h-full basis-5/12 overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <h3 className="mb-2 text-xl font-medium">New Todo</h3>
          <Input label="Title" {...register('title')} />
          <Input label="Description" {...register('desc')} />

          {/*TODO: Must be a select */}
          <Input label="Priority" />

          {/* TODO: Must be a date  */}
          <Input label="Target date" />

          {/*TODO: Must be a multiselect  */}
          <Input label="Categories" />

          {/* TODO: Must accept multiple inputs  */}
          <Input label="Assigned to" />
          <button
            type="submit"
            className="text center dark.hover:bg-blue-700 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:focus:ring-blue-800 sm:w-auto"
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
