import LeftSideBanner from 'shared/Banners/LeftSide'
import RightSideBanner from 'shared/Banners/RightSide'

export default function BannerTemplate({ children }) {
  return (
    <div className="flex gap-2">
      <LeftSideBanner />
      {children}
      <RightSideBanner />
    </div>
  )
}
