import { type ReactElement } from 'react'
import Sidebar from './Sidebar'

type Props = {
  children: ReactElement
}

export default function Layout({ children }: Props) {
  return (
    <main className="flex max-h-screen bg-base transition-colors delay-100 ease-linear dark:bg-base-dark dark:text-slate-400">
      <Sidebar />
      <div className="grow">{children}</div>
    </main>
  )
}
