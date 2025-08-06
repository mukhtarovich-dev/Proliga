import Image from 'next/image'
import { PAYMENT_OPTIONS } from 'utils/paymentOptions.util'
import { useTranslation } from 'react-i18next'
import { cn } from 'lib/utils'

const PaymePaymentOption = ({
  setPaymentOption,
  paymentOption,
  active,
  passive,
}) => {
  const { t } = useTranslation()
  return (
    <div
      onClick={() => setPaymentOption(PAYMENT_OPTIONS.PAYME)}
      className={cn(
        'bg-secondary flex size-36 cursor-pointer flex-col justify-center gap-2 rounded-xl border transition-all sm:size-44 lg:size-56 xl:size-60',
        paymentOption === PAYMENT_OPTIONS.PAYME ? active : passive
      )}
    >
      <Image
        src="/icons/payme.svg"
        width={36}
        draggable={false}
        height={36}
        className="h-auto w-20 self-center select-none lg:w-28"
        alt="payme"
      />
      <div className="w-full self-center text-center">
        <p className="text-foreground mx-2 text-center text-xs select-none lg:text-sm">
          {t('Payme orqali tolov qilish')}
        </p>
      </div>
    </div>
  )
}

export default PaymePaymentOption
