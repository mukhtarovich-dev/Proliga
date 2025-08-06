'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { PAYMENT_OPTIONS } from 'utils/paymentOptions.util'
import { NumericFormat } from 'react-number-format'
import { selectUser } from 'lib/features/auth/auth.selector'
import { cn } from 'lib/utils'
import { Wallet } from 'lucide-react'
import { supabase } from 'lib/supabaseClient'

const WalletPaymentOption = ({
  setPaymentOption,
  paymentOption,
  active,
  passive,
  toggleModal,
}) => {
  const { t } = useTranslation()
  const user = useSelector(selectUser)
  const [balance, setBalance] = useState(user?.balance / 100 || 0)

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

      setBalance(data?.balance / 100 || 0)
    }
    fetchBalance()
  }, [user?.id])

  return (
    <div
      onClick={() => setPaymentOption(PAYMENT_OPTIONS.WALLET)}
      className={cn(
        'bg-secondary flex size-36 cursor-pointer flex-col justify-center gap-2 rounded-xl border transition-all sm:size-44 lg:size-56 xl:size-60',
        paymentOption === PAYMENT_OPTIONS.WALLET ? active : passive
      )}
    >
      <Wallet className="text-foreground size-9 self-center select-none sm:size-12 lg:size-14" />
      <div className="w-full self-center text-center">
        <h4 className="text-sm font-medium select-none sm:text-base lg:text-lg">
          {t('Proliga hisobi')}
        </h4>
        <NumericFormat
          value={balance}
          className="text-foreground mx-1 w-full max-w-32 border-none bg-transparent text-center text-sm font-bold outline-hidden select-none md:max-w-40 xl:text-base"
          defaultValue={0}
          readOnly
          thousandSeparator
          fixedDecimalScale
          decimalScale={2}
          tabIndex={-1}
          suffix={' ' + t("so'm")}
        />
      </div>
      <button
        onClick={toggleModal}
        className="hover:bg-primary hover:text-accent-foreground mx-auto w-min self-center rounded-sm border px-3 py-1 text-xs text-nowrap transition-all select-none sm:text-sm lg:px-4 lg:text-base"
      >
        {t('Hisobni toldirish')}
      </button>
    </div>
  )
}

export default WalletPaymentOption
