import Gutter from 'components/Gutter'
import RulesSlider from '../RulesSlider'
import Matches from '../Matches'
import News from '../News'
import MiniBanner from 'shared/Banners/Mini'
import BigBanner from 'shared/Banners/Big'
import { memo } from 'react'

const PlayFooter = () => {
  return (
    <Gutter mobileFriendly>
      <section className="flex min-h-160 flex-col justify-between gap-2 py-4 lg:flex-row">
        <Matches />
        <section className="relative mx-auto h-min flex-col items-center justify-between overflow-hidden md:flex lg:mx-0">
          <MiniBanner />
          <BigBanner />
        </section>
        <News />
      </section>
      <RulesSlider />
    </Gutter>
  )
}

export default memo(PlayFooter)
