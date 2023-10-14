import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, type ReactElement } from 'react'
import { Toaster } from 'react-hot-toast'
import colors from 'tailwindcss/colors'
import Sidebar from './sidebar'

interface Props {
  children: ReactElement
}
export default function Layout({ children }: Props) {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      //eslint-disable-next-line
      router.push('/signIn')
    }
    if (session.status === 'authenticated') {
      //eslint-disable-next-line
      router.push('/')
    }
    //eslint-disable-next-line
  }, [session])

  return (
    <main className="flex bg-base transition-colors delay-100 ease-linear dark:bg-base-dark dark:text-slate-400">
      <Sidebar />
      <div className="grow">{children}</div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          error: { style: { background: colors.red[200] }, duration: 8000 }
        }}
      />
    </main>
  )
}
