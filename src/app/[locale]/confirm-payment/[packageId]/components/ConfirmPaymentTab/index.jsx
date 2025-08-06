'use client'
import { Link } from 'next-view-transitions'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { NumericFormat } from 'react-number-format'
import { PAYMENT_OPTIONS } from 'utils/paymentOptions.util'
import { useBuyPackageWithWallet } from 'hooks/payment/useBuyPackageWithWallet'
import { useBuyPackageWithPayme } from 'hooks/payment/useBuyPackageWithPayme'
import { useBuyPackageWithClick } from 'hooks/payment/useBuyPackageWithClick'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import { selectCurrentPackage } from 'lib/features/package/package.selector'
import { selectUser } from 'lib/features/auth/auth.selector'
import { useSession } from 'next-auth/react'
import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from 'lib/supabaseClient'

const ConfirmPaymentTab = ({ paymentOption }) => {
  const { lastVisitedTeam } = useSelector((store) => store.currentTeam)
  const { lang } = useSelector((store) => store.systemLanguage)
  const currentPackage = useSelector(selectCurrentPackage)
  const currentTeam = useSelector(selectCurrentTeam)
  const user = useSelector(selectUser)
  const [balance, setBalance] = useState(user?.balance || 0)

  useEffect(() => {
    const fetchBalance = async () => {
      const { data, error } = await supabase
        .from('user')
        .select('balance')
        .eq('id', user?.id)
        .single()

      if (error instanceof Error) {
        console.error(error.message)
      }

      setBalance(data?.balance || 0)
    }
    fetchBalance()
  }, [user?.id])
  const { update } = useSession()

  const { t } = useTranslation()
  const { buyPackageWithWallet, isLoading } = useBuyPackageWithWallet()
  const { buyPackageWithPayme, isLoading: isPaymeLoading } =
    useBuyPackageWithPayme()
  const { buyPackageWithClick, isLoading: isClickLoading } =
    useBuyPackageWithClick()

  const handleConfirmPayment = async () => {
    if (!currentPackage?.id) return toast.error(t('Joriy paket yo‘q!'))
    if (!paymentOption) return toast.error(t('To‘lov varianti topilmadi!'))
    if (
      paymentOption === PAYMENT_OPTIONS.WALLET &&
      balance < currentPackage?.price
    ) {
      return toast.error(t('Mablag‘ yetarli emas!'))
    }
    if (paymentOption === PAYMENT_OPTIONS.WALLET) {
      await buyPackageWithWallet({
        package_id: currentPackage?.id,
        team_id: currentTeam?.id,
      })
    }
    if (paymentOption === PAYMENT_OPTIONS.PAYME) {
      buyPackageWithPayme({
        user,
        currentPackage,
        currentTeam,
        lang,
      })
    }
    if (paymentOption === PAYMENT_OPTIONS.CLICKUP) {
      buyPackageWithClick({ user, currentPackage, currentTeam })
    }
    await update({
      updated_at: new Date(),
    })
  }

  return (
    <section className="from-secondary to-card mt-auto flex flex-col items-start justify-between gap-2 rounded-md bg-linear-to-l p-4 md:h-auto md:flex-row md:items-center md:p-6">
      <div className="xs:text-base flex items-center justify-center gap-2 text-sm font-medium md:text-lg">
        <p>{t("To'lov miqdori")}</p>
        <NumericFormat
          value={currentPackage?.price / 100 || 0}
          className="text xs:text-lg w-min border-none bg-transparent text-base font-bold outline-hidden select-none sm:text-xl"
          defaultValue={0}
          readOnly
          thousandSeparator
          fixedDecimalScale
          decimalScale={2}
          tabIndex={-1}
          suffix={' ' + t("so'm")}
        />
      </div>
      <div className="flex items-center gap-1 self-end font-medium md:self-auto">
        <Link
          href={'/play/' + lastVisitedTeam}
          className="bg-background hover:text-foreground hover:bg-secondary border-border text-muted-foreground flex h-10 w-24 items-center justify-center rounded-sm border text-center text-sm transition-all lg:w-32 lg:text-base"
        >
          {t('Qaytish')}
        </Link>
        <button
          onClick={handleConfirmPayment}
          disabled={isLoading || isClickLoading || isPaymeLoading}
          className="border-border bg-background hover:bg-primary hover:text-primary-foreground/80 text-foreground flex h-10 w-24 items-center justify-center rounded-sm border text-sm transition-all lg:w-32 lg:text-base"
        >
          {isLoading || isClickLoading || isPaymeLoading ? (
            <Loader className="text-foreground mx-auto size-5 animate-spin" />
          ) : (
            t("To'lash")
          )}
        </button>
      </div>
    </section>
  )
}

export default ConfirmPaymentTab
