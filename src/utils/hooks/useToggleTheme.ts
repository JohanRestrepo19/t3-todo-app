import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | null

export const useToggleTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(null)

  useEffect(() => {
    const htmlTag = document.querySelector('html')
    setCurrentTheme(localStorage.getItem('theme') as Theme)

    currentTheme === null || currentTheme === 'light'
      ? htmlTag?.classList.remove('dark')
      : htmlTag?.classList.add('dark')
  }, [currentTheme])

  const handleToggleTheme = () => {
    if (currentTheme === null || currentTheme === 'light') {
      localStorage.setItem('theme', 'dark')
      setCurrentTheme('dark')
    } else {
      localStorage.setItem('theme', 'light')
      setCurrentTheme('light')
    }
  }

  return {
    handleToggleTheme
  }
}
