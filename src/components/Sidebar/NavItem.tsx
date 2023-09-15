import { type LiHTMLAttributes } from 'react'
import Link from 'next/link'
import { type IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  label: string
  path?: string
  icon?: IconProp
}

export const SidebarNavItem = ({ label, path, icon, ...props }: Props) => {
  return (
    <li {...props}>
      <Link
        href={path || ''}
        className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      >
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          />
        )}
        <span className="ml-3">{label}</span>
      </Link>
    </li>
  )
}

export const SidebarActionItem = ({ icon, label, ...props }: Props) => {
  return (
    <li
      className="group flex cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      {...props}
    >
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
        />
      )}
      <span className="ml-3">{label}</span>
    </li>
  )
}
