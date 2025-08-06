'use client'

import PackageContainer from './components/Package'
import { PACKAGE_TYPE } from 'utils/packages.util'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchPackages } from 'lib/features/package/package.thunk'

const Packages = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPackages())
  }, [dispatch])

  return (
    <>
      <h1 className="text-foreground mb-8 text-center text-xl font-bold sm:text-2xl lg:text-3xl">
        {t('O‘yiningizni mukammallikka yetkazing')}
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(PACKAGE_TYPE).map((packageType) => (
          <PackageContainer key={packageType} packageType={packageType} t={t} />
        ))}
      </div>
    </>
  )
}

export default Packages
