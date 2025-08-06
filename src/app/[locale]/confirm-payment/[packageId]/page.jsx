'use client'

import Gutter from 'components/Gutter'
import dynamic from 'next/dynamic'
const CurrentPackage = dynamic(() => import('./components/CurrentPackage'), {
  ssr: false,
})
const PaymentOptions = dynamic(() => import('./components/PaymentOptions'), {
  ssr: false,
})
const ConfirmPaymentTab = dynamic(
  () => import('./components/ConfirmPaymentTab'),
  {
    ssr: false,
  }
)
import { toast } from 'sonner'
import Spinner from 'components/Spinner'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPackages } from 'lib/features/package/package.thunk'
import { useTransitionRouter } from 'next-view-transitions'
import { PAYMENT_OPTIONS } from 'utils/paymentOptions.util'
import { setCurrentPackage } from 'lib/features/package/package.slice'
import { useTranslation } from 'react-i18next'
import { selectCurrentCompetition } from 'lib/features/competition/competition.selector'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import {
  selectCurrentPackage,
  selectPackages,
} from 'lib/features/package/package.selector'
import { selectUser } from 'lib/features/auth/auth.selector'
import { selectCurrentTour } from 'lib/features/tour/tour.selector'
import { use } from 'react'

const ConfirmPayment = ({ params }) => {
  const { packageId } = use(params)

  const { t } = useTranslation()
  const router = useTransitionRouter()
  const dispatch = useDispatch()
  const [paymentOption, setPaymentOption] = useState(PAYMENT_OPTIONS.WALLET)
  const { isLoading } = useSelector((store) => store.package)
  const packages = useSelector(selectPackages)
  const currentPackage = useSelector(selectCurrentPackage)
  const currentTeam = useSelector(selectCurrentTeam)
  const currentTour = useSelector(selectCurrentTour)
  const currentCompetition = useSelector(selectCurrentCompetition)
  const user = useSelector(selectUser)

  useEffect(() => {
    if (
      !currentTeam?.id ||
      !currentTour?.id ||
      !currentCompetition?.id ||
      !user?.id
    ) {
      toast.info(t('Iltimos, avval jamoani tanlang!'))
      router.push('/championships')
    }
  }, [
    currentTeam?.id,
    currentTour?.id,
    currentCompetition?.id,
    router,
    user?.id,
    t,
  ])

  useEffect(() => {
    dispatch(setCurrentPackage(+packageId))
  }, [packageId, dispatch])

  useEffect(() => {
    if (packages?.length === 0) {
      dispatch(fetchPackages())
    }
  }, [dispatch, packages?.length])

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  if (!currentPackage?.id) return null
  return (
    <Gutter>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="my-4 flex min-h-[85vh] w-full flex-col">
          <CurrentPackage />
          <PaymentOptions
            paymentOption={paymentOption}
            setPaymentOption={setPaymentOption}
          />
          <ConfirmPaymentTab paymentOption={paymentOption} />
        </section>
      )}
    </Gutter>
  )
}

export default ConfirmPayment
