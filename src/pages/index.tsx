import { useState } from 'react'
import Head from 'next/head'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { type GetServerSideProps } from 'next'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { api, type RouterOutputs } from '@/utils/api'
import { appRouter } from '@/server/api/root'
import { createTRPCContext } from '@/server/api/trpc'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { createTodoSchema, type CreateTodo } from '@/utils/schemas'
import { getServerAuthSession } from '@/server/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getServerAuthSession(ctx)

  if (!session)
    return { redirect: { permanent: false, destination: '/signIn' } }

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: await createTRPCContext({
      req: ctx.req,
      res: ctx.res
    } as CreateNextContextOptions)
  })

  await helpers.todos.getTodoPriorities.prefetch()
  await helpers.categories.getAllByUserId.prefetch()
  await helpers.todos.getAllByUserId.prefetch()

  return {
    props: {
      trpcState: helpers.dehydrate()
    }
  }
}

export default function Home() {
  const utils = api.useContext()
  const { mutate, isLoading: isPosting } = api.todos.create.useMutation({
    onSuccess: async () => await utils.todos.invalidate()
  })
  const { data: priorities } = api.todos.getTodoPriorities.useQuery()
  const { data: todos } = api.todos.getAllByUserId.useQuery()
  const { data: categories } = api.categories.getAllByUserId.useQuery()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateTodo>({
    defaultValues: {
      categoryId: null,
      priority: null,
      targetDate: null
    },
    resolver: async (data, context, options) => {
      const result = await zodResolver(createTodoSchema)(data, context, options)
      console.log('Form data: ', data)
      console.log('Validation result: ', result)
      return result
    }
  })

  const handleSubmitForm: SubmitHandler<CreateTodo> = data => mutate(data)

  return (
    <>
      <Head>
        <title>TODO App</title>
        <meta name="description" content="todo app using t3 stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-full flex-col items-center gap-8 p-16 sm:flex-row sm:flex-wrap sm:items-start sm:justify-evenly">
        <form
          className="scrollbar block max-h-full basis-5/12 overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <h3 className="mb-2 text-xl font-medium">New Todo</h3>
          <Input
            label="Title"
            {...register('title')}
            errorMsg={errors.title?.message}
            autoComplete="off"
          />
          <Input
            label="Description"
            {...register('description')}
            errorMsg={errors.description?.message}
            autoComplete="off"
          />

          <Input
            label="Target date"
            type="date"
            {...register('targetDate')}
            errorMsg={errors.targetDate?.message}
            autoComplete="off"
          />

          <Select
            label="Priority"
            options={priorities?.map(prio => ({
              name: prio.toLowerCase(),
              value: prio
            }))}
            registerProps={register('priority')}
            errorMsg={errors.priority?.message}
          />

          <Select
            label="Category"
            options={categories?.map(cat => ({
              ...cat,
              value: cat.id
            }))}
            registerProps={register('categoryId')}
            errorMsg={errors.categoryId?.message}
          />

          <button
            type="submit"
            className="text center dark.hover:bg-blue-700 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:focus:ring-blue-800 sm:w-auto"
            disabled={isPosting}
          >
            Submit
          </button>
        </form>

        {/* Todo list */}
        <div className="scrollbar block max-h-full basis-5/12 overflow-hidden overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-2 text-xl font-medium">Todo list</h3>
          <ul className="space-y-2">
            {todos && todos.length > 0
              ? todos.map(todo => <AccordionTodo key={todo.id} todo={todo} />)
              : "There's nothing to do"}
          </ul>
        </div>
      </main>
    </>
  )
}

type Unpacked<T> = T extends (infer U)[] ? U : T
type Props = {
  todo: Unpacked<RouterOutputs['todos']['getAllByUserId']>
}
const AccordionTodo = ({ todo }: Props) => {
  const utils = api.useContext()
  const [isCollapsed, setIsCollapsed] = useState(true)
  const { mutate, isLoading: isDeleting } = api.todos.delete.useMutation({
    onSuccess: async () => await utils.todos.invalidate()
  })

  return (
    <div className="w-full items-center justify-between rounded-lg border border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800">
      <header className="flex justify-between ">
        <p className="capitalize underline underline-offset-2">{todo.title}</p>
        <div className="space-x-2">
          <span className="capitalize">{todo.status.toLowerCase()}</span>
          <FontAwesomeIcon
            icon={faAngleDown}
            className="inline h-5 w-5 flex-shrink-0 cursor-pointer text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            onClick={() => setIsCollapsed(prev => !prev)}
          />
        </div>
      </header>

      {!isCollapsed && (
        <div className="mt-4 space-y-4">
          <p>{todo.description}</p>

          <div className="flex justify-around">
            <button
              type="button"
              className="mb-2 mr-2 rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
              onClick={() => console.log('Im about to mark as done')}
            >
              Mark as done
            </button>

            <button
              disabled={isDeleting}
              type="button"
              className="mb-2 mr-2 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
              onClick={() => {
                console.log('Im about to mark delete this todo')
                mutate(todo.id)
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
