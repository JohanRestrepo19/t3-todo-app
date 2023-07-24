import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>TODO App</title>
        <meta name="description" content="todo app using t3 stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg border border-primary p-2 dark:border-primary-dark">
          Hola mundo
        </div>
      </main>
    </>
  )
}
