import { LoadingSpinner } from '@/components/LoadingSpinner'
import { CategoryItem } from '@/components/category'
import { Input } from '@/components/form'
import { api } from '@/utils/api'
import { createCategorySchema, type CreateCategory } from '@/utils/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

export default function Categories() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateCategory>({
    resolver: zodResolver(createCategorySchema)
  })
  const utils = api.useContext()
  const { mutate, isLoading: isPosting } = api.categories.create.useMutation({
    onSuccess: async () => {
      await utils.categories.invalidate()
      reset()
    },
    onError: error => toast.error(error.message)
  })
  const categoriesQuery = api.categories.getAllByUserId.useQuery()

  return (
    <main className="flex h-full flex-col items-center gap-8 p-16 sm:flex-row sm:flex-wrap sm:items-start sm:justify-evenly">
      <form
        className="scrollbar flex max-h-full basis-5/12 flex-col items-center overflow-hidden overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
        onSubmit={handleSubmit(data => {
          console.log('hola mundo: ', data)
          mutate(data)
        })}
      >
        <h3 className="mb-4 text-xl font-medium">Categories</h3>
        <Input
          autoComplete="off"
          label="Category name"
          {...register('name')}
          errorMsg={errors.name?.message}
        />

        <button
          type="submit"
          className="text center w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          disabled={isPosting}
        >
          Submit
        </button>

        <ul className="mt-2 w-full space-y-2 text-gray-500 dark:text-gray-400">
          {categoriesQuery.isLoading ? (
            <LoadingSpinner />
          ) : categoriesQuery.data?.length === 0 ? (
            <p className="text-center">
              You don&apos;t have any category yet...
            </p>
          ) : (
            categoriesQuery.data?.map(category => (
              <CategoryItem key={category.id} category={category} />
            ))
          )}
        </ul>
      </form>
    </main>
  )
}
