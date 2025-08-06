'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Camera, Loader } from 'lucide-react'
import { useUpdateUserData } from 'hooks/user/useUpdateUserData'
import { selectUser } from 'lib/features/auth/auth.selector'
import UploadFile from '../components/UploadFile'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Textarea } from 'components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select'
import { Label } from 'components/ui/label'
import Avatar from 'shared/Avatar'
import { useTransitionRouter } from 'next-view-transitions'

const GENDERS = {
  UNSET: 'unset',
  MALE: 'male',
  FEMALE: 'female',
}

const GeneralSettings = () => {
  const router = useTransitionRouter()
  const { t } = useTranslation()
  const user = useSelector(selectUser)
  const [date, setDate] = useState(new Date(user?.birth_date ?? Date.now()))
  const [firstName, setFirstName] = useState(user?.name ?? '')
  const [lastName, setLastName] = useState(user?.last_name ?? '')
  const [middleName, setMiddleName] = useState(user?.middle_name ?? '')
  const [bio, setBio] = useState(user?.bio ?? '')
  const [gender, setGender] = useState(user?.gender ?? GENDERS.UNSET)
  const [isModalOpen, setModalOpen] = useState(false)
  const { updateUserData, isLoading } = useUpdateUserData()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!firstName) {
      return toast.warning(t('Iltimos ismni kiriting'))
    }
    if (!gender) {
      return toast.warning(t('Iltimos jiningizni tanlang'))
    }

    await updateUserData({
      name: firstName,
      last_name: lastName,
      middle_name: middleName,
      bio,
      gender,
      birth_date: date,
      user,
      cb: () => {
        router.push('/settings')
      },
    })
  }

  return (
    <>
      <UploadFile isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
      <h3 className="text-foreground mb-2 text-xl font-bold tracking-tight">
        {t('Profil sozlamalari')}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <main className="flex flex-col items-start gap-2 sm:flex-row">
          <article className="relative">
            <Avatar
              className={
                'border-foreground/80 size-32 w-full rounded-xl border-2 xl:size-36'
              }
            />
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="bg-card hover:bg-secondary border-border absolute right-0 bottom-0 border"
              onClick={() => setModalOpen(true)}
            >
              <Camera className="text-foreground h-4 w-4" />
            </Button>
          </article>
          <section className="grid w-full flex-1 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <article className="space-y-1">
              <Label className="text-sm font-medium" htmlFor="firstName">
                {t('Ism')}
              </Label>
              <Input
                id="firstName"
                placeholder={t('Ism')}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-card text-foreground border-input placeholder:text-muted-foreground"
              />
            </article>
            <article className="space-y-1">
              <Label className="text-sm font-medium" htmlFor="lastName">
                {t('Familiya')}
              </Label>
              <Input
                id="lastName"
                placeholder={t('Familiya')}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-card text-foreground border-input placeholder:text-muted-foreground"
              />
            </article>
            <article className="space-y-1">
              <Label className="text-sm font-medium" htmlFor="middleName">
                {t('Sharif')}
              </Label>
              <Input
                id="middleName"
                placeholder={t('Sharif')}
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="bg-card text-foreground border-input placeholder:text-muted-foreground"
              />
            </article>
            <article className="space-y-1">
              <Label className="text-sm font-medium" htmlFor="birthdate">
                {t("Tug'ilgan kuni")}
              </Label>
              <Input
                id="birthdate"
                type="date"
                placeholder={t("Tug'ilgan kuni")}
                value={
                  date instanceof Date && !isNaN(date)
                    ? date?.toISOString().split('T')[0]
                    : date
                }
                onChange={(e) => setDate(new Date(e.target.value))}
                className="bg-card text-foreground border-input placeholder:text-muted-foreground h-10 w-full"
              />
            </article>
            <article className="space-y-1">
              <Label className="text-sm font-medium" htmlFor="gender">
                {t('Jins')}
              </Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger
                  id="gender"
                  className="bg-card text-foreground border-input w-full data-[size=default]:h-10"
                >
                  <SelectValue placeholder={t('Jins tanlang')} />
                </SelectTrigger>
                <SelectContent className="border-input bg-secondary text-foreground capitalize">
                  <SelectItem value={GENDERS.UNSET} className="text-foreground">
                    {t('Belgilanmagan')}
                  </SelectItem>
                  <SelectItem
                    value={GENDERS.MALE}
                    className="text-foreground capitalize"
                  >
                    {t('Erkak')}
                  </SelectItem>
                  <SelectItem
                    value={GENDERS.FEMALE}
                    className="text-foreground"
                  >
                    {t('Ayol')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </article>
          </section>
        </main>
        <section className="space-y-1">
          <Label className="text-sm font-medium" htmlFor="bio">
            {t('Siz haqingizda')}
          </Label>
          <Textarea
            id="bio"
            placeholder={t('Bio')}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="bg-card text-foreground border-input placeholder:text-muted-foreground h-40"
          />
        </section>
        <Button
          size="lg"
          className="xs:max-w-48 hover:bg-accent border-border w-full border"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="mx-auto animate-spin" />
          ) : (
            t('Saqlash')
          )}
        </Button>
      </form>
    </>
  )
}

export default GeneralSettings
