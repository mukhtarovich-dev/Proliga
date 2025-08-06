import { CompeteTable } from './CompeteTable'
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from 'components/ui/card'

const PromotionCompete = ({ t }) => {
  return (
    <Card className="relative h-full flex-1 rounded-none border-x-0 border-t-0 border-inherit shadow-none">
      <CardContent className="flex w-full flex-col-reverse justify-start gap-6 px-0 md:flex-row md:items-center md:justify-between md:gap-4 lg:gap-8">
        <div className="w-full flex-1 items-center self-center">
          <CompeteTable />
        </div>
        <div className="flex flex-1 flex-col items-start gap-2 sm:gap-4 md:gap-8">
          <CardTitle className="xs:text-xl text-lg font-bold uppercase md:text-2xl xl:text-3xl">
            {t('Raqobatlashing')}
          </CardTitle>
          <CardDescription className="xs:text-base max-w-lg text-sm md:text-lg lg:text-lg xl:text-xl">
            {t('Boshqa foydalanuvchilar')}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}

export default PromotionCompete
