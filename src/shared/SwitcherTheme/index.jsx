import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from 'lib/utils'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeToggle = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <button
      className={cn(
        'hover:text-accent-foreground text-foreground relative flex size-8 items-center justify-center bg-transparent p-0 hover:bg-transparent dark:hover:bg-transparent',
        theme === 'dark'
          ? 'hover:text-blue-500 dark:hover:text-blue-400'
          : 'hover:text-yellow-500 dark:hover:text-yellow-400'
      )}
      onClick={handleThemeToggle}
      aria-label="Toggle theme"
    >
      <Sun className="block size-5 transition-all dark:hidden" />
      <Moon className="hidden size-5 transition-all dark:block" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

export function ThemeSwitcherSkeleton() {
  return (
    <button
      className={cn(
        'text-foreground relative flex size-8 items-center justify-center bg-transparent p-0 hover:bg-transparent hover:text-neutral-500 dark:hover:bg-transparent dark:hover:text-neutral-400'
      )}
      aria-label="Toggle theme"
    >
      <Sun className="block size-5 transition-all dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

export default ThemeSwitcher
