import { getCorrectName } from 'utils/getCorrectName.util'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { unstable_cache } from 'next/cache'
import { supabase } from 'lib/supabaseClient'

export async function generateStaticParams() {
  try {
    const { data: newsItems, error } = await supabase
      .from('news')
      .select('id')
      .is('deleted_at', null)

    if (!newsItems) return []
    if (error) {
      return []
    }

    const locales = ['ru', 'uz']

    return newsItems.flatMap((item) =>
      locales.map((locale) => ({
        id: String(item.id),
        locale,
      }))
    )
  } catch (error) {
    console.error('Failed to generate static params for news:', error)
    return []
  }
}

export const revalidate = 60
const getNews = unstable_cache(
  async (id) => {
    const parsedId = Number(id)
    if (
      !id ||
      isNaN(parsedId) ||
      !Number.isInteger(parsedId) ||
      parsedId <= 0
    ) {
      return { data: null, error: new Error('Invalid news id') }
    }
    try {
      const { data: newsItem, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', parsedId)
        .is('deleted_at', null)
        .single()

      if (error) {
        throw error
      }

      return { data: newsItem, error: null }
    } catch (error) {
      console.error(`Failed to fetch news with id "${id}":`, error)
      return { data: null, error }
    }
  },
  ['getNews'],
  {
    revalidate: 3600,
  }
)

export async function generateMetadata({ params }) {
  const { id, locale } = await params
  const { data: news } = await getNews(id)

  if (!news) {
    return {
      title: 'News not found',
    }
  }

  const title = getCorrectName({
    lang: locale,
    ru: news.name_ru,
    uz: news.name,
  })

  const metadata = {
    title,
  }

  return metadata
}

export default async function NewsPage({ params }) {
  const { id, locale } = await params
  const { data: news, error } = await getNews(id)

  if (error || !news) {
    notFound()
  }

  const title = getCorrectName({
    lang: locale,
    ru: news.name_ru,
    uz: news.name,
  })
  const content = getCorrectName({
    lang: locale,
    ru: news.desc_ru,
    uz: news.desc,
  })

  return (
    <Card className="border-border my-4">
      <CardHeader>
        <CardTitle className={'border-b pb-8 text-3xl'}>{title}</CardTitle>
      </CardHeader>
      <CardContent className={''}>
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </CardContent>
    </Card>
  )
}
