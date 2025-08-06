'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, Loader } from 'lucide-react'
import { Input } from 'components/ui/input'
import { Button } from 'components/ui/button'
import { Label } from 'components/ui/label'
import { useSelector } from 'react-redux'
import {
  selectAgent,
  selectGeo,
  selectUser,
} from 'lib/features/auth/auth.selector'
import { PhoneInput } from 'components/PhoneInput'
import { useAuthChangePhone } from 'hooks/auth/useAuthChangePhone'
import ConfirmOTP from '../ConfirmOTP'
import { toast } from 'sonner'

export default function ChangePhoneForm() {
  const [isModalOpen, setModalOpen] = useState(false)
  const { t } = useTranslation()
  const { isLoading, updatePhone } = useAuthChangePhone()
  const user = useSelector(selectUser)
  const agent = useSelector(selectAgent)
  const geo = useSelector(selectGeo)

  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (phone.slice(0, 4) !== '+998') {
      return toast.error(t("Phone number must start with '+998'."))
    }
    if (phone.length !== 13) {
      return toast.error(t("Telefon raqam noto'g'ri"))
    }

    await updatePhone({
      phone_new: phone,
      password,
      agent,
      geo,
      id: user?.id,
      phone: user?.phone,
      cb: () => setModalOpen(true),
    })
  }

  return (
    <>
      <ConfirmOTP
        phone={phone}
        setModalOpen={setModalOpen}
        isModalOpen={isModalOpen}
        is_update={true}
        cb={() => {
          setModalOpen(false)
          setPassword('')
          setPhone('')
          toast.success(t('Telefon raqami muvaffaqiyatli o‘zgartirildi'), {
            duration: 3000,
            richColors: true,
          })
        }}
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 px-1 sm:max-w-96"
      >
        <div className="relative space-y-2">
          <Label htmlFor="phone">{t('New Phone Number')}:</Label>
          <PhoneInput
            id="phone"
            name="phone"
            defaultCountry="UZ"
            className="text-foreground placeholder:text-muted-foreground h-10 rounded"
            value={''}
            placeholder={'99-999-99-99'}
            onChange={setPhone}
          />
        </div>
        <div className="relative space-y-2 sm:max-w-96">
          <Label htmlFor="oldPassword">{t('Parol')}</Label>
          <div className="relative">
            <Input
              id="oldPassword"
              name="oldPassword"
              className="h-10 pr-10"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="hover:bg-foreground/10 dark:hover:bg-foreground/10 absolute top-0.5 right-0.5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="text-muted-foreground hover:text-foreground size-5" />
              ) : (
                <Eye className="text-muted-foreground hover:text-foreground size-5" />
              )}
            </Button>
          </div>
        </div>
        <Button
          className="hover:dark:bg-accent max-w-40"
          size="lg"
          variant={'outline'}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="text-foreground mx-auto size-5 animate-spin" />
          ) : (
            t('Saqlash')
          )}
        </Button>
      </form>
    </>
  )
}
