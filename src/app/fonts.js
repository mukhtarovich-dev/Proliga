import {
  Inter,
  Roboto,
  Open_Sans,
  Montserrat,
  IBM_Plex_Sans,
  Nunito,
  Merriweather,
  Playfair_Display,
  Lora,
  PT_Serif,
  JetBrains_Mono,
  IBM_Plex_Mono,
  Roboto_Mono,
  Commissioner,
} from 'next/font/google'

// Load fonts with subsets
export const inter = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  display: 'swap',
  variable: '--font-inter',
})

export const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],

  display: 'swap',
  variable: '--font-roboto',
})

export const openSans = Open_Sans({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],

  display: 'swap',
  variable: '--font-open-sans',
})

export const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],

  display: 'swap',
  variable: '--font-montserrat',
})

export const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  display: 'swap',
  variable: '--font-ibm-plex-sans',
})

export const nunito = Nunito({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  display: 'swap',
  variable: '--font-nunito',
})

export const merriweather = Merriweather({
  weight: ['400', '700'],
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  display: 'swap',
  variable: '--font-merriweather',
})

export const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'swap',
  variable: '--font-playfair-display',
})

export const lora = Lora({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  display: 'swap',
  variable: '--font-lora',
})

export const ptSerif = PT_Serif({
  weight: ['400', '700'],
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  display: 'swap',
  variable: '--font-pt-serif',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
})

export const robotoMono = Roboto_Mono({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export const commissioner = Commissioner({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  display: 'swap',
  variable: '--font-commissioner',
})

// Combine all font variables for use in layout
export const fontVariables = [
  inter.variable,
  roboto.variable,
  openSans.variable,
  montserrat.variable,
  ibmPlexSans.variable,
  nunito.variable,
  merriweather.variable,
  playfairDisplay.variable,
  lora.variable,
  ptSerif.variable,
  jetbrainsMono.variable,
  ibmPlexMono.variable,
  robotoMono.variable,
  commissioner.variable,
].join(' ')
