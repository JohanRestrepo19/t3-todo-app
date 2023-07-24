import { type ReactElement } from 'react'
import Sidebar from './Sidebar'

type Props = {
  children: ReactElement
}

export default function Layout({ children }: Props) {
  return (
    <main className="bg-base transition-colors delay-100 ease-linear dark:bg-base-dark dark:text-slate-400">
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">{children}</div>
      </div>
    </main>
  )
}
