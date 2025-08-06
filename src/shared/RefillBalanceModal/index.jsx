'use client'

import { useState, memo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog'
import { Input } from 'components/ui/input'
import { toast } from 'sonner'
import { PAYMENT_OPTIONS } from 'utils/paymentOptions.util'
import { useSelector } from 'react-redux'
import { useRedirectToClick } from 'hooks/payment/useRedirectToClick'
import { useRedirectToPayme } from 'hooks/payment/useRedirectToPayme'
import { CONFIG_KEY } from 'utils/config.util'
import { selectUser } from 'lib/features/auth/auth.selector'
import { selectSystemConfig } from 'lib/features/systemConfig/systemConfig.selector'
import { Button } from 'components/ui/button'
import { Label } from 'components/ui/label'
import Image from 'next/image'
import { ToggleGroup, ToggleGroupItem } from 'components/ui/toggle-group'
import { useTheme } from 'next-themes'
import { DEFAULT_BALANCE } from 'utils/config.global'
const PREDEFINED_AMOUNTS = [50000, 100000, 200000, 500000]

const RefillBalance = ({ isModalOpen, setIsModalOpen }) => {
  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()
  const user = useSelector(selectUser)
  const config = useSelector(selectSystemConfig)
  const { lang } = useSelector((store) => store.systemLanguage)

  const { redirectToClick } = useRedirectToClick()
  const { redirectToPayme } = useRedirectToPayme()

  const cabinet_payme =
    config[CONFIG_KEY.cabinet_payme]?.value.toLowerCase() === 'true' || false
  const cabinet_click =
    config[CONFIG_KEY.cabinet_click]?.value.toLowerCase() === 'true' || false
  const [paymentOption, setPaymentOption] = useState(null)
  const [amount, setAmount] = useState('')

  const formatNumber = (num) => {
    if (typeof num !== 'number' || !num) return '0'
    return new Intl.NumberFormat('ru-RU').format(num)
  }

  const handleSetAmount = (newAmount) => {
    setAmount(String(newAmount))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!paymentOption) {
      return toast.warning(t("Iltimos to'lov usulini tanlang"))
    }

    if (+amount < 100) {
      toast.warning(
        t("Hisobni kamida $ so'm ga toldirish lozim").replace('$', '100')
      )
      return
    }
    if (!user?.id) {
      return toast.error(t("Siz ro'yxatdan o'tmagansiz"))
    }

    if (paymentOption === PAYMENT_OPTIONS.CLICKUP) {
      redirectToClick({ amount, user })
    }
    if (paymentOption === PAYMENT_OPTIONS.PAYME) {
      redirectToPayme({ amount, lang, user })
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="text-foreground max-h-[90vh] w-[98%] max-w-lg overflow-y-auto rounded-xl p-4 sm:max-w-lg xl:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold sm:text-xl">
            {t('Balansni toldirish')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 py-4">
          <div className="w-full space-y-3">
            <Label className="text-sm font-medium sm:text-base">
              {t("To'lov usulini tanlang")}
            </Label>
            <ToggleGroup
              type="single"
              value={paymentOption}
              onValueChange={(value) => {
                if (value) setPaymentOption(value)
              }}
              className="grid grid-cols-2 gap-3"
            >
              {cabinet_payme && (
                <ToggleGroupItem
                  value={PAYMENT_OPTIONS.PAYME}
                  aria-label="Payme"
                  className="data-[state=on]:bg-background flex h-16 w-28 flex-col gap-2 rounded-lg border-2 p-4 data-[state=on]:border-[#0cbbbc]"
                >
                  <Image
                    src={'/icons/payme.svg'}
                    width={80}
                    height={24}
                    alt="payme"
                    className="h-full w-full"
                  />
                </ToggleGroupItem>
              )}
              {cabinet_click && (
                <ToggleGroupItem
                  value={PAYMENT_OPTIONS.CLICKUP}
                  aria-label="Click"
                  className="data-[state=on]:bg-background flex h-16 w-28 flex-col gap-2 rounded-lg border-2 p-4 data-[state=on]:border-[#0065FF]"
                >
                  <Image
                    src={
                      resolvedTheme === 'dark'
                        ? '/icons/click-up.svg'
                        : '/icons/click-up-dark.svg'
                    }
                    width={80}
                    height={24}
                    className="h-full w-full"
                    alt="click-up"
                  />
                </ToggleGroupItem>
              )}
            </ToggleGroup>
            {!cabinet_click && !cabinet_payme && (
              <p className="text-foreground border-destructive/50 bg-red-destructive flex h-10 w-full items-center justify-center rounded-sm border font-bold">
                {t("Hozircha to'lovlar o'chirib qo'yilgan!")}
              </p>
            )}
          </div>

          <div className="w-full space-y-3">
            <Label className="text-sm font-medium sm:text-base">
              {t('Summani tanlang')}
            </Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {PREDEFINED_AMOUNTS.map((predefinedAmount) => (
                <Button
                  key={predefinedAmount}
                  type="button"
                  variant={+amount === predefinedAmount ? 'default' : 'outline'}
                  onClick={() => handleSetAmount(predefinedAmount)}
                  className="h-12 text-base"
                >
                  {formatNumber(predefinedAmount)}
                </Button>
              ))}
            </div>
          </div>

          <div className="w-full space-y-3">
            <Label className="text-sm font-medium sm:text-base" htmlFor="money">
              {t("Yoki o'z summanigizni kiriting")}
            </Label>
            <div className="relative">
              <Input
                type="number"
                id="money"
                placeholder={t('Summani kiriting...')}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                name="money"
                className="h-12 pr-14 text-base"
              />
              <span className="text-muted-foreground absolute top-1/2 right-4 -translate-y-1/2 text-sm">
                {t("so'm")}
              </span>
            </div>
            <p className="text-muted-foreground text-xs">
              {t('Minimal: $ so`m').replace(
                '$',
                formatNumber(DEFAULT_BALANCE)
              )}
            </p>
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-12 border text-base font-bold"
            disabled={
              !paymentOption ||
              !amount ||
              +amount < DEFAULT_BALANCE
            }
          >
            {t("To'lash")}
          </Button>
        </form>
        <DialogDescription className="hidden">
          This is a dialog to refill user balance
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default memo(RefillBalance)
