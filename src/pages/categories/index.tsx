import { Input } from '@/components/form'
import { api, type RouterOutputs } from '@/utils/api'
import { createCategorySchema, type CreateCategory } from '@/utils/schemas'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

export default function Categories() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateCategory>({
    resolver: async (data, context, options) => {
      const result = await zodResolver(createCategorySchema)(
        data,
        context,
        options
      )
      console.log('Form data: ', data)
      console.log('Validation result: ', result)
      return result
    }
  })

  const utils = api.useContext()
  const { mutate, isLoading: isPosting } = api.categories.create.useMutation({
    onSuccess: async () => await utils.categories.invalidate(),
    onError: error => toast.error(error.message)
  })
  const { data: categories } = api.categories.getAllByUserId.useQuery()

  return (
    <main className="flex h-full flex-col items-center gap-8 p-16 sm:flex-row sm:flex-wrap sm:items-start sm:justify-evenly">
      <form
        className="scrollbar flex flex-col items-center max-h-full basis-5/12 overflow-hidden overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
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
          className="text center dark:hover:bg-blue-700 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:focus:ring-blue-800 sm:w-auto"
          disabled={isPosting}
        >
          Submit
        </button>

        <ul className="space-y-2 mt-2 w-full bg-green-200">
          {categories && categories.length > 0
            ? categories.map(category => (
                <CategoryItem key={category.id} category={category} />
              ))
            : 'There is no anything'}
        </ul>
      </form>
    </main>
  )
}

type Unpacked<T> = T extends (infer U)[] ? U : T
interface Props {
  category: Unpacked<RouterOutputs['categories']['getAllByUserId']>
}
const CategoryItem = ({ category }: Props) => {
  const utils = api.useContext()
  const { mutate, isLoading: isDeleting } =
    api.categories.deleteById.useMutation({
      onSuccess: async () => await utils.categories.invalidate()
    })

  return (
    <li
      className="flex justify-between w-auto items-center rounded-lg border border-gray-200 p-2 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
      key={category.id}
    >
      <p className="text-left">{category.name}</p>
      <button
        type="button"
        disabled={isDeleting}
        className="rounded-lg border border-red-700 px-2.5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
        onClick={() => mutate(category.id)}
      >
        <FontAwesomeIcon
          icon={faXmark}
          className="h-3 w-3 flex-shrink-0 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
        />
      </button>
    </li>
  )
}
