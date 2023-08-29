import { type LiHTMLAttributes } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ThemeToggler } from './ThemeToggler'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faRectangleList,
  faRightFromBracket,
  faTags
} from '@fortawesome/free-solid-svg-icons'

import { type IconProp } from '@fortawesome/fontawesome-svg-core'

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  label: string
  path?: string
  icon?: IconProp
}
const SidebarNavItem = ({ label, path, icon, ...props }: Props) => {
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

const SidebarActionItem = ({ icon, label, ...props }: Props) => {
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

export default function Sidebar() {
  const session = useSession()
  console.log("User's session from sidebar: ", session)
  return (
    <aside className="min-h-screen w-48 -translate-x-full transition-transform sm:translate-x-0">
      <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 transition-colors delay-100 ease-linear dark:bg-gray-800">
        {/* TODO: Add app logo or user profile image */}
        <Link href="/" className="mb-5 flex items-center pl-2.5">
          {/*eslint-disable-next-line*/}
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-7"
            alt="User's profile picture"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Todo App
          </span>
        </Link>
        <ul className="space-y-2 font-medium">
          <SidebarNavItem label="Home" path="/" icon={faHome} />
          <SidebarNavItem
            label="All todos"
            path="/todos"
            icon={faRectangleList}
          />
          <SidebarNavItem label="Categories" path="/categories" icon={faTags} />
        </ul>
        <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 font-medium dark:border-gray-700">
          <li>
            <ThemeToggler />
          </li>
          <SidebarActionItem label="Logout" icon={faRightFromBracket} />
        </ul>
      </div>
    </aside>
  )
}
