import { type ReactElement } from 'react'
import Sidebar from './Sidebar'

type Props = {
  children: ReactElement
}

export default function Layout({ children }: Props) {
  return (
    <main className="bg-slate-200 dark:bg-slate-700 dark:text-slate-400">
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">{children}</div>
      </div>
    </main>
  )
}
