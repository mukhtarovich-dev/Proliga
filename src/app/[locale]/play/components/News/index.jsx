'use client'

import { fetchNews } from 'lib/features/news/news.thunk'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useState, useEffect, useMemo } from 'react'
import { NewsSkeleton } from './Skeleton'
import { cn } from 'lib/utils'
import { Pagination } from 'components/Table/Pagination/Server'
import { selectNews } from 'lib/features/news/news.selector'
import { Button } from 'components/ui/button'
import { RefreshCcw, Newspaper } from 'lucide-react'
import Article from './Article'
import NewsArticle from './NewsArticle'
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from 'components/ui/card'

const News = () => {
  const dispatch = useDispatch()
  const { isLoading, count } = useSelector((store) => store.news)
  const news = useSelector(selectNews)
  const [page, setPage] = useState(0)
  const perPage = 5
  const { t } = useTranslation()
  const pages = useMemo(() => Math.ceil(count / perPage), [count, perPage])

  useEffect(() => {
    dispatch(fetchNews({ page, perPage }))
  }, [dispatch, page, perPage])

  const refreshData = () => {
    dispatch(fetchNews({ page, perPage }))
  }

  if (isLoading) {
    return (
      <NewsSkeleton count={perPage} paginationCount={pages < 5 ? pages : 5} />
    )
  }

  return (
    <Card
      className={cn(
        'border-border relative mx-auto flex h-172 w-full max-w-lg gap-4 lg:mx-0 lg:min-w-72 lg:flex-1'
      )}
    >
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <Newspaper className="size-6" />
          {t('Yangiliklar')}
        </CardTitle>
        <Button
          onClick={refreshData}
          variant="outline"
          size="icon"
          className="border-muted size-9"
        >
          <RefreshCcw className="text-foreground size-5" />
        </Button>
      </CardHeader>
      <CardContent className="flex h-full w-full flex-1 flex-col gap-2">
        {news?.map((item) => (
          <Article key={item.id} item={item} />
        ))}
        {news?.length === 0 && (
          <p className="text-muted-foreground mt-2 text-center">
            {t('Yangiliklar mavjud emas!')}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Pagination
          onPageChange={setPage}
          currentPage={page}
          totalPages={pages}
          className={'w-full'}
        />
      </CardFooter>
      <NewsArticle />
    </Card>
  )
}

export default News
