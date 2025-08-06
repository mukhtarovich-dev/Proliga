import Image from 'next/image'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from 'components/ui/card'

const PromotionCreateTeam = ({ t }) => {
  return (
    <Card className="relative h-full flex-1 rounded-none border-x-0 border-t-0 border-inherit shadow-none">
      <CardHeader className="bg-primary w-full max-w-72 -skew-x-12 self-start rounded-xs sm:max-w-[24rem] md:max-w-lg">
        <h2 className="xs:text-xl text-primary-foreground text-center text-lg font-bold capitalize md:text-2xl xl:text-3xl">
          {t('Umumiy qoidalar')}
        </h2>
      </CardHeader>
      <CardContent className="flex h-full max-h-[42rem] w-full flex-col gap-4 px-0 lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:gap-0">
        <div className="flex h-full flex-col gap-2 sm:gap-4 md:gap-8">
          <CardTitle className="xs:text-xl text-lg font-bold uppercase md:text-2xl xl:text-3xl">
            {t("jamoa yig'ing")}
          </CardTitle>
          <CardDescription className="xs:text-base max-w-lg text-sm md:text-lg lg:text-lg xl:max-w-xl xl:text-xl">
            {t('promotion_text')}
          </CardDescription>
          <Image
            width={200}
            height={200}
            quality={100}
            alt="footballers images"
            className="hidden h-full w-full max-w-[440px] object-contain lg:block"
            src="/images/footballers-tile.webp"
            draggable={false}
            unoptimized
          />
        </div>
        <div className="relative flex w-full lg:h-full">
          <Image
            width={450}
            height={500}
            quality={100}
            src="/images/promotion-stadium.webp"
            draggable={false}
            className="mx-auto aspect-[1/1.1] h-full w-full max-w-[32rem] object-contain lg:mr-0 lg:ml-auto"
            alt="interactive stadium"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default PromotionCreateTeam
