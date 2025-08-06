import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog'
import { Button } from 'components/ui/button'
import { useState } from 'react'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from 'lib/features/auth/auth.selector'
import { useCreateUserTheme } from 'hooks/theme/useCreateUserTheme'
import { Loader2, Save } from 'lucide-react'
import {
  fetchThemes,
  fetchUserThemes,
} from 'lib/features/theme/theme.thunk'
import {
  selectDarkTheme,
  selectLightTheme,
} from 'lib/features/theme/theme.selector'
import { useCreatePresetTheme } from 'hooks/theme/useCreatePresetTheme'

const CreateThemeModal = ({ isGlobal, open, setOpen }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [nameRu, setNameRu] = useState('')
  const user = useSelector(selectUser)
  const { createUserTheme, isLoading: isUserLoading } = useCreateUserTheme()
  const { createPresetTheme, isLoading: isPresetLoading } =
    useCreatePresetTheme()
  const isLoading = isUserLoading || isPresetLoading
  const darkTheme = useSelector(selectDarkTheme)
  const lightTheme = useSelector(selectLightTheme)

  const handleSave = async (e) => {
    try {
      e.preventDefault()

      if (!user?.id) {
        toast.error(t('Please login first'))
        return
      }
      if (!name || !nameRu) {
        toast.error(t('Please enter a name'))
        return
      }

      if (isGlobal) {
        await createPresetTheme({
          user_id: user.id,
          name,
          name_ru: nameRu,
          dark_theme: darkTheme,
          light_theme: lightTheme,
          cb: () => {
            dispatch(fetchThemes())
            dispatch(fetchUserThemes(user.id))
            toast.success(t('Theme preset saved successfully'))
          },
        })
      } else {
        await createUserTheme({
          name,
          name_ru: nameRu,
          user_id: user.id,
          dark_theme: darkTheme,
          light_theme: lightTheme,
          cb: () => {
            dispatch(fetchThemes())
            dispatch(fetchUserThemes(user.id))
            toast.success(t('Theme saved successfully'))
          },
        })
      }
      setOpen(false)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className={'mb-4'}>
          <DialogTitle>{t('Create a Theme')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSave} className={'flex flex-col gap-4'}>
          <div className="space-y-2">
            <Label>{t('Name in Uzbek')}</Label>
            <Input
              value={name}
              className="border-border border shadow-md"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('Name in Russian')}</Label>
            <Input
              value={nameRu}
              className="border-border border shadow-md"
              onChange={(e) => setNameRu(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4 transition-transform group-hover:scale-110" />
            )}
            {t('Saqlash')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateThemeModal
