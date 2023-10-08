import { useEffect, type ReactElement } from 'react'
import Sidebar from './sidebar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

type Props = {
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
    <main className="flex max-h-screen bg-base transition-colors delay-100 ease-linear dark:bg-base-dark dark:text-slate-400">
      <Sidebar />
      <div className="grow">{children}</div>
    </main>
  )
}
