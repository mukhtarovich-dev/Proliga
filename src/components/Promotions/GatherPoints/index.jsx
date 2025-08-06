import Image from 'next/image'
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from 'components/ui/card'

const PromotionGatherPoints = ({ t }) => {
  return (
    <Card className="relative h-full flex-1 rounded-none border-x-0 border-t-0 border-inherit shadow-none">
      <CardContent className="flex w-full flex-col justify-between gap-4 px-0 md:flex-row lg:gap-0">
        <div className="my-auto flex flex-col gap-2 sm:gap-4 md:gap-8">
          <CardTitle className="xs:text-xl text-lg font-bold uppercase md:text-2xl xl:text-3xl">
            {t('Ochkolar yiging')}
          </CardTitle>
          <CardDescription className="xs:text-base max-w-lg text-sm md:max-w-lg md:text-lg lg:text-lg xl:max-w-xl xl:text-xl">
            {t("Har bir o'yinchi")}
          </CardDescription>
        </div>
        <div className="h-full self-center md:self-start">
          <Image
            src="/images/promotion-2.webp"
            alt="football"
            width={400}
            height={400}
            draggable={false}
            className="h-full w-full min-w-80 lg:min-w-96"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default PromotionGatherPoints
