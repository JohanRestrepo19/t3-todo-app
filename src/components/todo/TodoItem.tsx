import { api, type RouterOutputs } from '@/utils/api'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

type Unpacked<T> = T extends (infer U)[] ? U : T
interface Props {
  todo: Unpacked<RouterOutputs['todos']['getAllByUserId']>
}

export const TodoItem = ({ todo }: Props) => {
  const utils = api.useContext()
  const [isCollapsed, setIsCollapsed] = useState(true)

  const { mutate: deleteMutation, isLoading: isDeleting } =
    api.todos.deleteById.useMutation({
      onSuccess: async () => await utils.todos.getAllByUserId.invalidate()
    })
  const { mutate: markAsDoneMutation, isLoading: isMarkingDone } =
    api.todos.markAsDoneById.useMutation({
      onSuccess: async () => await utils.todos.getAllByUserId.invalidate()
    })
  const { mutate: markAsPendingMutation, isLoading: isMarkingPending } =
    api.todos.markAsPendingById.useMutation({
      onSuccess: async () => await utils.todos.getAllByUserId.invalidate()
    })

  const statusColor =
    todo.status === 'DONE'
      ? 'text-green-400'
      : todo.status === 'PENDING'
      ? 'text-blue-400'
      : 'text-red-400'

  return (
    <div className="w-full items-center justify-between rounded-lg border border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800">
      <header className="flex flex-wrap items-start justify-between">
        <p className="basis-1/2">
          <span className="font-semibold capitalize underline underline-offset-2">
            {todo.title}:
          </span>
          <span className={`${statusColor} capitalize font-bold`}>
            {' '}{todo.status.toLowerCase()}
          </span>
        </p>

        <div
          className="basis-1/2 cursor-pointer text-right"
          onClick={() => setIsCollapsed(prev => !prev)}
        >
          <span className="capitalize">{todo.category?.name}</span>
          <FontAwesomeIcon
            icon={faAngleDown}
            className="inline h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          />
        </div>
      </header>

      {!isCollapsed && (
        <div className="mt-4 space-y-4">
          <p>
            <span className="font-semibold underline underline-offset-2">
              Description:
            </span>
            <span> {todo.description}</span>
          </p>

          <div className="flex flex-wrap justify-around">
            <button
              disabled={isMarkingDone || isMarkingPending}
              type="button"
              className="mb-2 mr-2 rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
              onClick={() => {
                if (todo.status !== 'DONE') markAsDoneMutation(todo.id)
                else markAsPendingMutation(todo.id)
              }}
            >
              {todo.status === 'DONE' ? 'Mark as pending' : 'Mark as done'}
            </button>

            <button
              disabled={isDeleting}
              type="button"
              className="mb-2 mr-2 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
              onClick={() => deleteMutation(todo.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
