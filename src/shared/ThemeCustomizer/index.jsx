import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'components/ui/sheet'
import { Palette } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs'
import { RefreshCw, Loader2, Save } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from 'lib/features/auth/auth.selector'
import { toast } from 'sonner'
import { setDefaultTheme } from 'lib/features/theme/theme.slice'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Switch } from 'components/ui/switch'
import CreateThemeModal from './components/CreateThemeModal'
import { useResetUserThemes } from 'hooks/theme/useResetUserThemes'
import ColorModifier from './components/ColorModifier'
import FontModifier from './components/FontModifer'
import GlobalModifier from './components/GlobalModifier'
import ShadowModifier from './components/ShadowsModifier'
import SelectTheme from './components/SelectTheme'
import { selectThemes } from 'lib/features/theme/theme.selector'
import { useSaveTheme } from 'hooks/theme/useSaveTheme'
import { useSetThemeDefault } from 'hooks/theme/useSetThemeDefault'
import {
  selectDarkTheme,
  selectLightTheme,
} from 'lib/features/theme/theme.selector'
import {
  fetchThemes,
  fetchUserThemes,
} from 'lib/features/theme/theme.thunk'

const ThemeCustomizer = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const user = useSelector(selectUser)
  const { selectedTheme, isModified } = useSelector((store) => store.theme)
  const themes = useSelector(selectThemes)
  const { t } = useTranslation()
  const [isDefault, setIsDefault] = useState(false)
  const [isGlobal, setIsGlobal] = useState(false)
  const { resetUserThemes, isLoading } = useResetUserThemes()
  const { saveTheme, saveUserTheme } = useSaveTheme()
  const { setThemeDefault } = useSetThemeDefault()
  const darkTheme = useSelector(selectDarkTheme)
  const lightTheme = useSelector(selectLightTheme)

  const handleReset = async () => {
    if (user?.id) {
      try {
        await resetUserThemes({
          user_id: user.id,
          cb: () => {
            toast.success(t('Successfully saved the default theme'))
          },
        })
      } catch (error) {
        toast.error(error)
      }
    } else {
      dispatch(setDefaultTheme())
      toast.success(t('Theme is reset to default'))
    }
  }

  const handleSavePreset = () => {
    const theme = themes.find((theme) => +theme.id === +selectedTheme)
    if (!theme?.id) return toast.error(t('Theme not found'))

    if (theme?.is_global) {
      saveTheme({
        theme,
        user_id: user?.id,
        cb: () => {
          dispatch(fetchUserThemes(user.id))
          dispatch(fetchThemes())
          toast.success(t('Theme saved successfully'))
        },
      })
    } else {
      saveUserTheme({
        theme,
        user_id: user?.id,
        cb: () => {
          toast.success(t('Theme saved successfully'))
        },
      })
    }
  }

  const handleSetDefault = async () => {
    try {
      if (!selectedTheme) return toast.error(t('Please select a theme'))
      if (!user?.is_admin) return toast.error(t('You are not authorized'))

      await setThemeDefault({
        theme_id: selectedTheme,
        dark_theme: darkTheme,
        light_theme: lightTheme,
        cb: () => {
          toast.success(t('New default theme is set'))
        },
      })
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleClick = () => {
    if (!user?.id) return toast.warning(t('Please login first'))

    if (isDefault) {
      return handleSetDefault()
    }

    if (isModified) {
      return setOpen(true)
    }

    return handleSavePreset()
  }

  return (
    <Sheet>
      <SheetTrigger className="bg-background hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative flex size-7 shrink-0 items-center justify-center gap-2 rounded-md border p-0 font-sans text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50">
        <Palette className="text-foreground hover:text-accent-foreground dark:text-accent size-4 select-none" />
      </SheetTrigger>
      <SheetContent
        className={
          'min-w-full gap-0 overflow-y-auto border-l border-[#4A4A4A] bg-transparent sm:min-w-md'
        }
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500',
          letterSpacing: '0.025em',
          borderRadius: '0px',
          padding: '1rem 1.5rem',
          color: '#E0E0E0',
          '--spacing': '0.25rem',
          '--letter-spacing': '0.025em',
          '--radius': '0.25rem',
          '--shadow-color': '#000000',
          '--shadow-opacity': '0.5',
          '--shadow-blur': '10px',
          '--shadow-offset-x': '0px',
          '--shadow-offset-y': '0px',
        }}
      >
        <SheetHeader className={'px-0 py-4'}>
          <SheetTitle className="text-[#E0E0E0]">
            {t('Theme Customizer')}
          </SheetTitle>
        </SheetHeader>
        <SelectTheme />
        <Tabs defaultValue="color" className="mt-4">
          <TabsList className="w-full rounded-[6px] bg-[#2D2D2D] p-1">
            <TabsTrigger
              value="color"
              className="w-full rounded-[4px] px-3 py-1.5 text-sm font-medium text-[#B0B0B0] focus-visible:bg-[#353535] focus-visible:text-[#A0A0A0] focus-visible:ring-2 focus-visible:ring-[#353535] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] data-[state=active]:bg-[#353535] data-[state=active]:text-[#A0A0A0] data-[state=active]:shadow-sm"
            >
              {t('Color')}
            </TabsTrigger>
            <TabsTrigger
              value="font"
              className="w-full rounded-[4px] px-3 py-1.5 text-sm font-medium text-[#B0B0B0] focus-visible:bg-[#353535] focus-visible:text-[#A0A0A0] focus-visible:ring-2 focus-visible:ring-[#353535] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] data-[state=active]:bg-[#353535] data-[state=active]:text-[#A0A0A0] data-[state=active]:shadow-sm"
            >
              {t('Font')}
            </TabsTrigger>
            <TabsTrigger
              value="global"
              className="w-full rounded-[4px] px-3 py-1.5 text-sm font-medium text-[#B0B0B0] focus-visible:bg-[#353535] focus-visible:text-[#A0A0A0] focus-visible:ring-2 focus-visible:ring-[#353535] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] data-[state=active]:bg-[#353535] data-[state=active]:text-[#A0A0A0] data-[state=active]:shadow-sm"
            >
              {t('Global')}
            </TabsTrigger>
            <TabsTrigger
              value="shadow"
              className="w-full rounded-[4px] px-3 py-1.5 text-sm font-medium text-[#B0B0B0] focus-visible:bg-[#353535] focus-visible:text-[#A0A0A0] focus-visible:ring-2 focus-visible:ring-[#353535] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] data-[state=active]:bg-[#353535] data-[state=active]:text-[#A0A0A0] data-[state=active]:shadow-sm"
            >
              {t('Shadow')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="color" className="mt-4">
            <ColorModifier />
          </TabsContent>
          <TabsContent value="font" className="mt-4">
            <FontModifier />
          </TabsContent>
          <TabsContent value="global" className="mt-4">
            <GlobalModifier />
          </TabsContent>
          <TabsContent value="shadow" className="mt-4">
            <ShadowModifier />
          </TabsContent>
        </Tabs>
        <section className="mt-2 flex items-center justify-center gap-2">
          <CreateThemeModal
            isDefault={isDefault}
            isGlobal={isGlobal}
            open={open}
            setOpen={setOpen}
          />
          <button
            className="group flex w-1/2 items-center justify-center gap-2 rounded-md bg-[#ffdd00] px-4 py-2.5 text-sm font-medium text-[#1A1A1A] shadow-sm transition-colors hover:bg-[#ebcb00] focus:ring-2 focus:ring-[#ffdd00] focus:ring-offset-2 focus:ring-offset-[#232323] focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            aria-label="Save theme changes"
            onClick={handleClick}
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4 transition-transform group-hover:scale-110" />
            )}
            {t('Saqlash')}
          </button>
          <button
            onClick={handleReset}
            disabled={isLoading}
            className="group flex w-1/2 items-center justify-center gap-2 rounded-md border border-[#4A4A4A] bg-[#353535] px-4 py-2.5 text-sm font-medium text-[#E0E0E0] shadow-sm transition-colors hover:bg-[#656565] focus:ring-2 focus:ring-[#757575] focus:ring-offset-2 focus:ring-offset-[#232323] focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            aria-label="Reset theme to default"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <RefreshCw className="size-4 transition-transform group-hover:rotate-180" />
            )}
            {t('Tozalash')}
          </button>
        </section>
        {user?.id && user?.is_admin && (
          <div className="my-4 flex flex-col gap-3 rounded-md border border-[#4A4A4A] bg-[#353535] p-4">
            <Switch
              aria-readonly
              checked={isDefault}
              onCheckedChange={setIsDefault}
            />
            <label htmlFor="theme-switch">{t('Set theme as default')}</label>
            <Switch
              aria-readonly
              checked={isGlobal || isDefault}
              onCheckedChange={setIsGlobal}
            />
            <label htmlFor="theme-switch">{t('Save as a preset')}</label>
          </div>
        )}
        <SheetDescription className={'sr-only'}>
          {t('Theme Customizer')}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default ThemeCustomizer
