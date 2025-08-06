'use client'

import { Link } from 'next-view-transitions'
import { useSelector } from 'react-redux'
import { BANNER, BANNER_SERVICE_TYPE } from 'utils/banner.util'
import { useMemo, useEffect, memo } from 'react'
import { useCreateBannerView } from 'hooks/system/useCreateBannerView'
import {
  selectGeo,
  selectAgent,
  selectUser,
} from 'lib/features/auth/auth.selector'
import { selectBanners } from 'lib/features/banner/banner.selector'
import { getUrl } from 'utils/static.util'

const MiniBanner = () => {
  const banners = useSelector(selectBanners)
  const agent = useSelector(selectAgent)
  const user = useSelector(selectUser)
  const geo = useSelector(selectGeo)
  const { createBannerView } = useCreateBannerView()

  const banner = useMemo(
    () => banners.find((b) => b?.banner_type === BANNER.MINI_BANNER),
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
          className="mb-2 block h-[120px] w-[360px] overflow-hidden rounded-sm"
        >
          <img
            src={getUrl(banner?.content_url) ?? ''}
            alt={banner?.name}
            loading="lazy"
            className="h-full w-full rounded-sm"
          />
        </Link>
      )}
    </>
  )
}

export default memo(MiniBanner)
