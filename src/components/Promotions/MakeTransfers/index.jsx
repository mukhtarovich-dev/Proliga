import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from 'components/ui/card'
import { ArrowRightLeft } from 'lucide-react'

const PromotionMakeTransfers = ({ t }) => {
  return (
    <Card className="relative h-full flex-1 rounded-none border-x-0 border-t-0 border-inherit shadow-none">
      <CardContent className="align-center flex flex-col gap-2 bg-cover px-0 sm:gap-4 md:gap-8">
        <CardTitle className="xs:text-xl self-center text-lg font-bold uppercase md:text-2xl xl:text-3xl">
          {t('Transferlarni amalga oshiring')}
        </CardTitle>
        <CardDescription className="xs:text-base w-full max-w-xl self-center text-center text-sm md:text-lg lg:text-lg xl:max-w-2xl xl:text-xl">
          {t('Agar sizning jamoangizdagi')}
        </CardDescription>
        <div className="mx-auto flex w-full flex-1 items-center justify-center gap-6 md:w-auto md:flex-row">
          <img
            src="/images/transfer-from.webp"
            alt="transfer field"
            className="sm:size-40 size-30 rounded-full md:size-48"
          />
          <ArrowRightLeft className="text-foreground size-6 md:size-12" />
          <img
            src="/images/transfer-to.webp"
            alt="transfer field"
            className="sm:size-40 size-30 rounded-full md:size-48"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default PromotionMakeTransfers
