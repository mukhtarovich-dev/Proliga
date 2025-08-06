import Image from 'next/image'
import { useTheme } from 'next-themes'

const NavbarLogo = () => {
  const { resolvedTheme } = useTheme()

  return resolvedTheme === 'dark' ? (
    <Image
      src={'/icons/proliga-full-dark.svg'}
      priority={true}
      quality={100}
      alt="Proliga"
      width={180}
      height={56}
      draggable={false}
      className="xs:w-32 w-28 cursor-pointer md:w-36"
    />
  ) : (
    <Image
      src={'/icons/proliga-full-light.svg'}
      priority={true}
      quality={100}
      alt="Proliga"
      width={180}
      height={56}
      draggable={false}
      className="xs:w-32 w-28 cursor-pointer md:w-36"
    />
  )
}

export default NavbarLogo
