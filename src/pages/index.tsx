import { Input, Select } from '@/components/form'
import { AccordionTodo } from '@/components/todo'
import { appRouter } from '@/server/api/root'
import { createTRPCContext } from '@/server/api/trpc'
import { getServerAuthSession } from '@/server/auth'
import { api } from '@/utils/api'
import { createTodoSchema, type CreateTodo } from '@/utils/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { type GetServerSideProps } from 'next'
import Head from 'next/head'
import { useForm } from 'react-hook-form'

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
    resolver: zodResolver(createTodoSchema)
  })

  const utils = api.useContext()
  const { mutate, isLoading: isPosting } = api.todos.create.useMutation({
    onSuccess: async () => await utils.todos.invalidate()
  })
  const { data: priorities } = api.todos.getTodoPriorities.useQuery()
  const { data: todos } = api.todos.getAllByUserId.useQuery()
  const { data: categories } = api.categories.getAllByUserId.useQuery()

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
          onSubmit={handleSubmit(data => mutate(data))}
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
            className="text center dark:hover:bg-blue-700 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:focus:ring-blue-800 sm:w-auto"
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
