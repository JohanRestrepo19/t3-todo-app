import { useToggleTheme } from '@/utils/hooks/useToggleTheme'
import {
  faHome,
  faRightFromBracket,
  faRightToBracket,
  faSun,
  faTags
} from '@fortawesome/free-solid-svg-icons'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { SidebarActionItem, SidebarNavItem } from './NavItem'

export default function Sidebar() {
  const { data, ...session } = useSession()
  const { handleToggleTheme } = useToggleTheme()

  const handleLogin = async () => await signIn()
  const handleLogout = async () => await signOut()

  return (
    <aside className="min-h-screen w-48 -translate-x-full transition-transform sm:translate-x-0">
      <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 transition-colors delay-100 ease-linear dark:bg-gray-800">
        <Link href="/" className="mb-5 flex items-center pl-2.5">
          <Image
            src={
              data?.user.image || 'https://flowbite.com/docs/images/logo.svg'
            }
            className="mr-3 h-auto w-auto"
            alt="User's profile picture"
            width={24}
            height={24}
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Todo App
          </span>
        </Link>

        {session.status === 'authenticated' && (
          <ul className="space-y-2 font-medium">
            <SidebarNavItem label="Home" path="/" icon={faHome} />

            <SidebarNavItem
              label="Categories"
              path="/categories"
              icon={faTags}
            />
          </ul>
        )}

        <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 font-medium dark:border-gray-700">
          <SidebarActionItem
            label="Theme"
            icon={faSun}
            onClick={handleToggleTheme}
          />

          {session.status === 'authenticated' ? (
            <SidebarActionItem
              label="Logout"
              icon={faRightFromBracket}
              onClick={handleLogout}
            />
          ) : (
            <SidebarActionItem
              label="Login"
              icon={faRightToBracket}
              onClick={handleLogin}
            />
          )}
        </ul>
      </div>
    </aside>
  )
}
