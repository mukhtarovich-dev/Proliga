import Image from 'next/image'
import { PAYMENT_OPTIONS } from 'utils/paymentOptions.util'
import { useTranslation } from 'react-i18next'
import { cn } from 'lib/utils'
import { useTheme } from 'next-themes'

const ClickUpPaymentOption = ({
  setPaymentOption,
  paymentOption,
  active,
  passive,
}) => {
  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()

  return (
    <div
      onClick={() => setPaymentOption(PAYMENT_OPTIONS.CLICKUP)}
      className={cn(
        'bg-secondary flex size-36 cursor-pointer flex-col justify-center gap-2 rounded-xl border transition-all sm:size-44 lg:size-56 xl:size-60',
        paymentOption === PAYMENT_OPTIONS.CLICKUP ? active : passive
      )}
    >
      <Image
        src={
          resolvedTheme === 'dark'
            ? '/icons/click-up.svg'
            : '/icons/click-up-dark.svg'
        }
        width={36}
        draggable={false}
        height={36}
        className="h-8 w-20 self-center select-none lg:h-9 lg:w-28"
        alt="click up"
      />
      <div className="w-full self-center text-center">
        <p className="text-foreground mx-2 text-xs select-none lg:text-sm">
          {t('Click up orqali tolov qilish')}
        </p>
      </div>
    </div>
  )
}

export default ClickUpPaymentOption
