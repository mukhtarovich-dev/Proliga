import Gutter from 'components/Gutter'
import Image from 'next/image'

export default function TeamViewLayout({ children }) {
  return (
    <div className="text-foreground relative flex flex-col gap-4 overflow-hidden bg-linear-to-tr pt-14 pb-2">
      <div aria-hidden="true" className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/images/Hero.webp"
          alt="Hero background"
          fill
          priority
          className="animate-in fade-in object-cover duration-500"
          quality={100}
        />
        <div className="animate-in fade-in absolute inset-0 bg-black/30 duration-500 dark:bg-black/60" />
      </div>
      <Gutter mobileFriendly>{children}</Gutter>
    </div>
  )
}
