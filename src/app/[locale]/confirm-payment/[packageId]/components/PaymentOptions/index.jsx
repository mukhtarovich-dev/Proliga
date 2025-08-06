import WalletPaymentOption from './Wallet'
import ClickUpPaymentOption from './ClickUp'
import PaymePaymentOption from './Payme'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import RefillBalance from 'shared/RefillBalanceModal'
import { useSelector } from 'react-redux'
import { CONFIG_KEY } from 'utils/config.util'
import { selectSystemConfig } from 'lib/features/systemConfig/systemConfig.selector'

const PaymentOptions = ({ paymentOption, setPaymentOption }) => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const active = 'border-accent bg-background'
  const passive = 'border-muted-foreground hover:border-accent/80'
  const config = useSelector(selectSystemConfig)

  const checkout_payme =
    config[CONFIG_KEY.checkout_payme]?.value.toLowerCase() === 'true' || null
  const checkout_click =
    config[CONFIG_KEY.checkout_click]?.value.toLowerCase() === 'true' || null

  return (
    <div className="mt-2 mb-4">
      <div className="flex w-full items-center gap-4 p-4 lg:p-6">
        <span className="bg-secondary text-foreground hidden size-12 items-center justify-center rounded-full font-bold sm:flex">
          2
        </span>
        <h3 className="text-sm font-medium sm:text-base md:text-lg lg:text-xl">
          {t("To'lov usulini tanlang")}
        </h3>
      </div>
      <section className="flex flex-wrap justify-center gap-2 sm:justify-start">
        <WalletPaymentOption
          paymentOption={paymentOption}
          setPaymentOption={setPaymentOption}
          active={active}
          passive={passive}
          toggleModal={() => setIsModalOpen(true)}
        />
        {checkout_click && (
          <ClickUpPaymentOption
            paymentOption={paymentOption}
            setPaymentOption={setPaymentOption}
            active={active}
            passive={passive}
          />
        )}
        {checkout_payme && (
          <PaymePaymentOption
            paymentOption={paymentOption}
            setPaymentOption={setPaymentOption}
            active={active}
            passive={passive}
          />
        )}
      </section>
      <RefillBalance
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  )
}

export default PaymentOptions
