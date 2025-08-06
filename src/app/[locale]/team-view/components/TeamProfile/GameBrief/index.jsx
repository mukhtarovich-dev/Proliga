'use client'

import {
  selectCurrentTour,
  selectTours,
} from 'lib/features/tour/tour.selector'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { TOUR_STATUS } from 'utils/tour.util'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { Coins, PercentCircle } from 'lucide-react'
import { getCorrectName } from 'utils/getCorrectName.util'
import { selectCurrentCompetition } from 'lib/features/competition/competition.selector'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import { selectCurrentTourTeam } from 'lib/features/tourTeam/tourTeam.selector'
import { formatDate } from 'utils/formatDate.util'
import { Copy } from 'lucide-react'
import {
  GameBriefContainer,
  Section,
  Item,
  Title,
  Content,
  GameBriefSkeleton,
} from 'shared/GameBrief'

const GameBrief = () => {
  const { t } = useTranslation()
  const [nextTour, setNextTour] = useState(null)
  const { lang } = useSelector((store) => store.systemLanguage)
  const { currentTourIndex, isLoading } = useSelector((store) => store.tour)
  const currentTour = useSelector(selectCurrentTour)
  const tours = useSelector(selectTours)
  const currentTeam = useSelector(selectCurrentTeam)
  const currentCompetition = useSelector(selectCurrentCompetition)
  const currentTourTeam = useSelector(selectCurrentTourTeam)
  const { teamPrice } = useSelector((store) => store.teamPlayer)

  const teamBalance = +(currentTeam?.balance || 0) - +(teamPrice || 0)

  useEffect(() => {
    if (tours.length > 0) {
      const nextTour = tours[currentTourIndex + 1]
      setNextTour(nextTour)
    }
  }, [tours, currentTourIndex])

  const date = new Date(nextTour?.datetime_start)
  const curDate = new Date(currentTour?.datetime_start)

  const handleClick = (value) => {
    navigator.clipboard.writeText(value)
    toast.info(t('Buferga muvaffaqiyatli nusxalandi!'))
  }

  return (
    <GameBriefContainer isLoading={isLoading} className="h-auto xl:h-auto">
      {isLoading ? (
        <GameBriefSkeleton />
      ) : (
        <>
          <Section className="border-border border-b">
            <Item>
              <Title className="">{t('Team id')}</Title>
              <Content
                className={
                  'flex cursor-pointer items-center justify-center gap-0.5 hover:underline'
                }
                onClick={() => handleClick(currentTeam?.id)}
              >
                <Copy className="text-foreground size-5" />
                {currentTeam?.id}
              </Content>
            </Item>
            <Item>
              <Title>{t('Nomi')}</Title>
              <Content>{currentTeam?.name}</Content>
            </Item>
          </Section>
          <Section className="border-border border-b">
            <Item>
              <Title> {t('Keyingi Tur')}</Title>
              <Content className="text-sm md:text-base">
                {getCorrectName({
                  lang,
                  uz: nextTour?.name,
                  ru: nextTour?.name_ru,
                })}
              </Content>
            </Item>
            <Item>
              <Title>{t('Deadline')}</Title>
              {currentTour?.status !== TOUR_STATUS.notStartedTransfer ? (
                <Content>{formatDate(date)}</Content>
              ) : (
                <Content>{formatDate(curDate)}</Content>
              )}
            </Item>
          </Section>
          <Section className="border-border border-b">
            <Item>
              <Title>{t('Tur')}</Title>
              <Content>
                {getCorrectName({
                  lang,
                  uz: currentTour?.name,
                  ru: currentTour?.name_ru,
                }) ?? t('Hozirgi Tur')}
              </Content>
            </Item>
            <Item>
              <Title>{t('Turdagi ochkolar')}</Title>
              <Content>{currentTourTeam?.point ?? '0'}</Content>
            </Item>
          </Section>
          <Section className="border-border border-b">
            <Item>
              <Title>{t('Turnirdagi ochkolar')}</Title>
              <Content>{currentTeam?.point ?? '0'}</Content>
            </Item>
            <Item>
              <Title>{t("Turnirdagi o'rtacha ochkolar")}</Title>
              <Content>{currentCompetition?.average_team_point ?? '0'}</Content>
            </Item>
          </Section>
          <Section className="border-border border-b">
            <Item>
              <Title>{t('Chempionat')}</Title>
              <Content className="capitalize">
                {getCorrectName({
                  lang,
                  uz: currentTeam?.competition_id?.name,
                  ru: currentTeam?.competition_id?.name_ru,
                })}
              </Content>
            </Item>
            <Item>
              <Title className="text-foreground">{t("Ligadagi o'rin")}</Title>
              <Content className="space-x-1">
                {currentTeam?.order ?? '0'} /{' '}
                {currentCompetition?.team_count ?? '0'}
              </Content>
            </Item>
          </Section>
          <Section>
            <Item>
              <Title>{t('Jamoa narxi')}</Title>
              <Content className={'flex items-center gap-1'}>
                <PercentCircle className="text-accent size-5" />
                {teamPrice ?? 0}
              </Content>
            </Item>
            <Item>
              <Title>{t('Balans')}</Title>
              <Content className={'flex items-center gap-1'}>
                <Coins className="text-accent size-5" />
                {teamBalance ?? 0}
              </Content>
            </Item>
          </Section>
        </>
      )}
    </GameBriefContainer>
  )
}

export default GameBrief
