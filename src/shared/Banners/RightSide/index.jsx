'use client'

import { Link } from 'next-view-transitions'
import { useSelector } from 'react-redux'
import { BANNER, BANNER_SERVICE_TYPE } from 'utils/banner.util'
import { useMemo, useState, useEffect, memo } from 'react'
import { useCreateBannerView } from 'hooks/system/useCreateBannerView'
import YandexAd from '../YandexAd'
import {
  selectGeo,
  selectAgent,
  selectUser,
} from 'lib/features/auth/auth.selector'
import { selectBanners } from 'lib/features/banner/banner.selector'
import { getUrl } from 'utils/static.util'

const RightSideBanner = () => {
  const banners = useSelector(selectBanners)
  const agent = useSelector(selectAgent)
  const user = useSelector(selectUser)
  const geo = useSelector(selectGeo)
  const NEXT_PUBLIC_BANNER_TWO_RENDER_WIDTH =
    // eslint-disable-next-line no-undef
    process.env.NEXT_PUBLIC_BANNER_TWO_RENDER_WIDTH ?? 1440

  const [windowWidth, setWindowWidth] = useState(0)
  const { createBannerView } = useCreateBannerView()

  const banner = useMemo(
    () => banners.find((b) => b?.banner_type === BANNER.SIDE_BANNER_RIGHT),
    [banners]
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    if (
      windowWidth >= NEXT_PUBLIC_BANNER_TWO_RENDER_WIDTH &&
      banner?.type === BANNER_SERVICE_TYPE.CUSTOM
    ) {
      if (banner?.id && user?.id && geo && agent) {
        createBannerView({
          banner_id: banner?.id,
          user,
          geo,
          agent,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    banner,
    NEXT_PUBLIC_BANNER_TWO_RENDER_WIDTH,
    windowWidth,
    agent,
    user?.id,
    geo,
    createBannerView,
  ])

  return (
    <>
      {windowWidth >= NEXT_PUBLIC_BANNER_TWO_RENDER_WIDTH &&
        banner?.type === BANNER_SERVICE_TYPE.CUSTOM && (
          <Link
            href={banner?.link ?? ''}
            className="mb-auto hidden h-[560px] w-40 min-w-40 overflow-hidden rounded-xs lg:block"
          >
            <img
              src={getUrl(banner?.content_url) ?? ''}
              alt={banner?.name}
              loading="lazy"
              className="h-full w-full"
            />
          </Link>
        )}
      {windowWidth >= NEXT_PUBLIC_BANNER_TWO_RENDER_WIDTH &&
        banner?.type === BANNER_SERVICE_TYPE.YANDEX && (
          <div className="mb-auto hidden h-[560px] w-40 min-w-40 overflow-hidden rounded-xs lg:block">
            <YandexAd blockId={banner?.service_id} />
          </div>
        )}
    </>
  )
}

export default memo(RightSideBanner)
