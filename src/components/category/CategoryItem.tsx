import { api, type RouterOutputs } from '@/utils/api'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Unpacked<T> = T extends (infer U)[] ? U : T
interface Props {
  category: Unpacked<RouterOutputs['categories']['getAllByUserId']>
}

export const CategoryItem = ({ category }: Props) => {
  const utils = api.useContext()
  const { mutate, isLoading: isDeleting } =
    api.categories.deleteById.useMutation({
      onSuccess: async () => await utils.categories.invalidate()
    })

  return (
    <li
      className="flex w-auto items-center justify-between rounded-lg border border-gray-200 p-2 text-left font-medium hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
      key={category.id}
    >
      <p className="text-left">{category.name}</p>
      <button
        type="button"
        disabled={isDeleting}
        className="rounded-lg border border-red-700 px-2.5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
        onClick={() => mutate(category.id)}
      >
        <FontAwesomeIcon
          icon={faXmark}
          className="h-3 w-3 flex-shrink-0 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
        />
      </button>
    </li>
  )
}
