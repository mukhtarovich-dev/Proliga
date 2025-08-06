'use client'
import Gutter from 'components/Gutter'
import TopTeams from './components/TopTeams'
import { Card, CardContent } from 'components/ui/card'
import BannerTemplate from 'app/[locale]/play/components/BannerTemplate'

export default function TeamPagesLayout({ children }) {
  return (
    <Gutter mobileFriendly>
      <BannerTemplate>
        <section className="mx-auto flex w-full max-w-2xl flex-col gap-2 lg:mx-0 lg:max-w-none lg:flex-row">
          <Card
            className={'border-border h-min w-full overflow-x-auto lg:w-2/3'}
          >
            <CardContent
              className={
                'flex h-full min-h-[32rem] flex-col justify-between gap-2 px-4 lg:min-h-[36rem] 2xl:min-h-[40rem]'
              }
            >
              {children}
            </CardContent>
          </Card>
          <TopTeams />
        </section>
      </BannerTemplate>
    </Gutter>
  )
}
