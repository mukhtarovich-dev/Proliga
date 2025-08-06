import '../globals.css'
import { Link } from 'next-view-transitions'
import { Button } from 'components/ui/button'
import { Card } from 'components/ui/card'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 p-4 dark:bg-neutral-900">
      <Card className="w-full max-w-md border-4 border-blue-500 bg-white dark:border-yellow-500 dark:bg-neutral-800">
        <div className="p-6 text-center">
          <h1 className="mb-4 text-6xl font-bold text-blue-500 dark:text-yellow-500">
            404
          </h1>
          <div className="relative mx-auto mb-6 h-24 w-24">
            <div className="absolute inset-0 rounded-full bg-blue-500 dark:bg-yellow-500"></div>
            <div className="absolute inset-2 rounded-full bg-white dark:bg-neutral-800"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-500 dark:text-yellow-500">
                XATO
              </span>
            </div>
          </div>
          <h2 className="mb-4 text-2xl font-semibold text-blue-400 dark:text-yellow-400">
            Sahifa topilmadi
          </h2>
          <p className="mb-6 text-gray-600 dark:text-neutral-400">
            Kechirasiz, siz so&apos;ragan sahifa mavjud emas. Iltimos, manzilni
            tekshiring yoki quyidagi havoladan foydalaning.
          </p>
          <Button
            asChild
            className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-yellow-500 dark:text-neutral-950 dark:hover:bg-yellow-600"
          >
            <Link href="/">Bosh sahifaga qaytish</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
