'use client'

import YandexAd from '../YandexAd'
import { Link } from 'next-view-transitions'
import { useSelector } from 'react-redux'
import { useMemo, useEffect, memo } from 'react'
import { BANNER, BANNER_SERVICE_TYPE } from 'utils/banner.util'
import { useCreateBannerView } from 'hooks/system/useCreateBannerView'
import {
  selectAgent,
  selectGeo,
  selectUser,
} from 'lib/features/auth/auth.selector'
import { selectBanners } from 'lib/features/banner/banner.selector'
import { getUrl } from 'utils/static.util'

const BigBanner = () => {
  const banners = useSelector(selectBanners)
  const agent = useSelector(selectAgent)
  const user = useSelector(selectUser)
  const geo = useSelector(selectGeo)
  const { createBannerView } = useCreateBannerView()

  const banner = useMemo(
    () => banners.find((b) => b?.banner_type === BANNER.BIG_BANNER),
    [banners]
  )

  useEffect(() => {
    if (banner?.type === BANNER_SERVICE_TYPE.CUSTOM) {
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
  }, [banner, agent, user?.id, geo, createBannerView])

  return (
    <>
      {banner?.type === BANNER_SERVICE_TYPE.CUSTOM && (
        <Link
          href={banner?.link ?? ''}
          className="block h-[480px] w-[360px] overflow-hidden rounded-sm"
        >
          <img
            src={getUrl(banner?.content_url) ?? ''}
            alt={banner?.name}
            loading="lazy"
            className="h-full w-full rounded-sm"
          />
        </Link>
      )}
      {banner?.type === BANNER_SERVICE_TYPE.YANDEX && (
        <div className="block max-h-[700px] max-w-[360px] overflow-hidden rounded-sm">
          <YandexAd blockId={banner?.service_id} />
        </div>
      )}
    </>
  )
}

export default memo(BigBanner)
