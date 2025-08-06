'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from 'components/ui/carousel'
import CreateTeamSlide from './CreateTeamSlide'
import GatherPointsSlide from './GatherPointsSlide'
import MakeTransfersSlide from './MakeTransfersSlide'
import CompeteSlide from './CompeteSlide'
import RulesSliderTitle from './RulesSliderTitle'
import WinPrizesSlide from './WinPrizesSlide'

function RulesSlider() {
  return (
    <Carousel
      opts={{ loop: true }}
      className="bg-card border-border rounded-xl border px-6 py-4"
    >
      <RulesSliderTitle />
      <CarouselContent className="mb-4">
        <CarouselItem className="min-h-96 rounded md:min-h-104 xl:min-h-136">
          <CreateTeamSlide />
        </CarouselItem>
        <CarouselItem className="min-h-96 md:min-h-104 xl:min-h-136">
          <GatherPointsSlide />
        </CarouselItem>
        <CarouselItem className="min-h-96 rounded md:min-h-104 xl:min-h-136">
          <MakeTransfersSlide />
        </CarouselItem>
        <CarouselItem className="min-h-96 md:min-h-104 xl:min-h-136">
          <CompeteSlide />
        </CarouselItem>
        <CarouselItem className="min-h-96 rounded md:min-h-104 xl:min-h-136">
          <WinPrizesSlide />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="hover:bg-accent dark:hover:bg-accent/50 left-4" />
      <CarouselNext className="hover:bg-accent dark:hover:bg-accent/50 right-4" />
    </Carousel>
  )
}

export default RulesSlider
