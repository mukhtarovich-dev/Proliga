import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from 'components/ui/dialog'
import { CalendarDays, Eye } from 'lucide-react'
import { ScrollArea } from 'components/ui/scroll-area'
import { useTranslation } from 'react-i18next'
import { getCorrectName } from 'utils/getCorrectName.util'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate, formatViews } from 'utils/formatDate.util'
import { selectCurrentNews } from 'lib/features/news/news.selector'
import { setNewsModal } from 'lib/features/news/news.slice'
import { memo } from 'react'

function NewsArticle() {
  const dispatch = useDispatch()
  const currentNews = useSelector(selectCurrentNews)
  const { isModalOpen } = useSelector((store) => store.news)
  const { lang } = useSelector((store) => store.systemLanguage)
  const { t } = useTranslation()
  const date = formatDate(currentNews?.created_at, 'news')

  const setModalOpen = () => {
    dispatch(setNewsModal(false))
  }

  return (
    <Dialog open={isModalOpen && currentNews?.id} onOpenChange={setModalOpen}>
      <DialogContent className="w-full max-w-4xl rounded-xl px-2 py-4 sm:max-w-4xl md:p-4 2xl:max-w-5xl">
        <DialogTitle className="mr-7 text-xl leading-tight font-medium tracking-wide">
          {getCorrectName({
            lang,
            uz: currentNews?.name,
            ru: currentNews?.name_ru,
          })}
        </DialogTitle>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <CalendarDays className="text-muted-foreground mr-1 size-5" />
            <time className="text-foreground/80" dateTime={date}>
              {date}
            </time>
          </div>
          <div className="flex items-center">
            <Eye className="text-muted-foreground mr-1 size-5" />
            <span className="text-foreground/80">
              {formatViews(currentNews?.view_count || 0)} {t('views')}
            </span>
          </div>
        </div>
        <ScrollArea className="bg-card h-[75vh] rounded">
          <div
            className="modal-news xs:px-2 xs:py-3 bg-transparent px-1 py-2 2xl:p-4"
            dangerouslySetInnerHTML={{
              __html: getCorrectName({
                lang,
                uz: currentNews?.desc,
                ru: currentNews?.desc_ru,
              }),
            }}
            lang={lang}
          />
        </ScrollArea>
        <DialogDescription className="hidden">
          {currentNews?.desc}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
export default memo(NewsArticle)
