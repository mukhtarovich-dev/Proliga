import { PACKAGE_TYPE } from 'utils/packages.util'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { NumericFormat } from 'react-number-format'
import { selectCurrentPackage } from 'lib/features/package/package.selector'

const CurrentPackage = () => {
  const { t } = useTranslation()
  const currentPackage = useSelector(selectCurrentPackage)

  const getPackageText = (currentPackage) => {
    if (currentPackage?.type === PACKAGE_TYPE.team_balance) return t('Balansni')
    if (currentPackage?.type === PACKAGE_TYPE.transfer_count)
      return t('Transferla sonini')
    if (currentPackage?.type === PACKAGE_TYPE.single_club_count)
      return t("Maksimum klub oyi'nchilarini")
  }
  return (
    <div className="bg-card flex flex-row items-center gap-4 rounded-md p-4 md:h-24 md:p-6">
      <span className="bg-background text-muted-foreground hidden size-12 items-center justify-center rounded-full font-bold sm:flex">
        1
      </span>
      <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0">
        <div className="xs:text-base space-x-2 text-sm select-none sm:text-lg">
          {getPackageText(currentPackage).replace('$', currentPackage?.amount)}
        </div>
        <NumericFormat
          value={currentPackage?.price / 100 || 0}
          className="text-foreground xs:text-base w-min border-none bg-transparent text-center text-sm font-bold outline-hidden select-none md:text-2xl"
          defaultValue={0}
          readOnly
          thousandSeparator
          fixedDecimalScale
          decimalScale={2}
          tabIndex={-1}
          suffix={' ' + t("so'm")}
        />
      </div>
    </div>
  )
}

export default CurrentPackage
