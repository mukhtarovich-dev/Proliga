import Image from 'next/image'
import { Button } from 'components/ui/button'
import { Share2 } from 'lucide-react'
import { cn } from 'lib/utils'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { SelectTrigger } from 'components/ui/select'
import { Loader } from 'lucide-react'

export const StadiumContainer = ({ children, hideShareButton = false }) => {
  const { t } = useTranslation()

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value)
    toast.info(t('Buferga muvaffaqiyatli nusxalandi!'))
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Fantasy Football',
        url: window.location.href.replace('play', 'team-view'),
      })
    } else {
      handleCopy(window.location.href.replace('play', 'team-view'))
    }
  }

  return (
    <section className="relative h-auto w-full">
      <Image
        src="/icons/stadium.svg"
        alt="stadium"
        width={500}
        height={450}
        draggable={false}
        priority
        className="w-full rounded-xl select-none"
      />
      {!hideShareButton && (
        <Button
          onClick={handleShare}
          variant={'ghost'}
          className={cn(
            'border-primary xs:bottom-4 xs:right-4 absolute right-3 bottom-3 z-20 size-6 cursor-pointer rounded-sm border bg-transparent p-0 sm:right-5 sm:bottom-5 md:size-7'
          )}
          aria-label="Share"
        >
          <Share2 className="text-primary hover:text-secondary-foreground size-3.5 md:size-4" />
        </Button>
      )}
      {children}
    </section>
  )
}

export function StadiumSectionWrapper({ children }) {
  return (
    <div className="xs:px-0 mx-auto flex h-full w-full max-w-lg grow flex-col px-2 lg:mx-0 lg:w-1/2 lg:max-w-2xl xl:grow-0">
      {children}
    </div>
  )
}

export function StadiumSelectTrigger({ children, ...props }) {
  return (
    <SelectTrigger
      className="border-border bg-card dark:bg-card dark:hover:bg-card text-foreground hover:border-primary xs:w-44 w-40 data-[size=default]:h-10 md:w-48"
      {...props}
    >
      {children}
    </SelectTrigger>
  )
}

export function StadiumSaveButton({ children, ...props }) {
  return (
    <Button
      className="bg-card text-foreground 2xs:min-w-28 hover:border-accent-foreground border-border hover:bg-accent hover:text-accent-foreground h-10 min-w-24 border text-sm font-bold transition-all sm:min-w-32"
      {...props}
    >
      {children}
    </Button>
  )
}

export function StadiumSpinner() {
  return (
    <div className="absolute right-0 bottom-0 left-0 mx-auto flex h-full items-center justify-center self-center rounded-md">
      <Loader className="mx-auto size-10 text-white animate-spin sm:size-12" />
    </div>
  )
}
