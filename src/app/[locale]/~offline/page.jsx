import { cn } from 'lib/utils'
import OfflineClient from './components/OfflineClient'

export const metadata = {
  title: 'Offline',
}

const OfflinePage = () => {
  return (
    <div
      className={cn(
        'flex min-h-screen flex-col items-center justify-center p-4',
        'bg-gradient-to-b from-white to-gray-100 text-gray-900 transition-colors duration-200 dark:from-neutral-900 dark:to-neutral-950 dark:text-white'
      )}
    >
      <OfflineClient />
    </div>
  )
}

export default OfflinePage
