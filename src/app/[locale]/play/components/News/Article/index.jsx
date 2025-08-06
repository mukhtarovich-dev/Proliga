import { useDispatch, useSelector } from 'react-redux'
import { formatDate, formatViews } from 'utils/formatDate.util'
import { CalendarDays, Eye } from 'lucide-react'
import { getCorrectName } from 'utils/getCorrectName.util'
import { useUpdateNewsView } from 'hooks/system/useUpdateNewsView'
import { getUrl } from 'utils/static.util'
import { setCurrentNews, setNewsModal } from 'lib/features/news/news.slice'
import { memo, useMemo } from 'react'

const Article = ({ item }) => {
  const dispatch = useDispatch()
  const { lang } = useSelector((store) => store.systemLanguage)
  const { updateNewsView } = useUpdateNewsView()
  const date = useMemo(
    () => formatDate(item?.created_at, 'news'),
    [item?.created_at]
  )

  const handleClick = () => {
    dispatch(setCurrentNews(item))
    dispatch(setNewsModal(true))
    setTimeout(async () => await updateNewsView(item?.id), 3000)
  }

  return (
    <article
      onClick={handleClick}
      className="group bg-background/50 flex h-[100px] w-auto overflow-hidden rounded hover:cursor-pointer"
    >
      <section className="my-auto flex aspect-4/3 h-full w-24 shrink-0 items-center justify-center md:w-32">
        <img
          src={getUrl(item?.image) || ''}
          alt={item.name}
          className="h-full w-full rounded-sm object-cover object-center shadow-md"
        />
      </section>
      <section className="flex h-full w-full flex-col space-y-1 px-2 py-1">
        <h4 className="text-foreground line-clamp-3 h-full w-auto max-w-full flex-1 text-xs break-all hover:underline md:text-sm">
          {getCorrectName({ lang, uz: item?.name, ru: item?.name_ru })}
        </h4>
        <div className="flex w-full flex-wrap items-center justify-between">
          <div className="text-muted-foreground flex items-center space-x-1 text-xs">
            <div className="flex items-center gap-1">
              <CalendarDays className="size-4" />
              <time dateTime={date}>{date}</time>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="text-foreground size-4" />
              <span>{formatViews(+item.view_count || 0)}</span>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

export default memo(Article)
