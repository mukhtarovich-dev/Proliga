import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { supabase } from '../../../lib/supabaseClient'
import { incrementNewsView } from 'lib/features/news/news.slice'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

export const useUpdateNewsView = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const updateNewsView = useCallback(
    async (news_id) => {
      setIsLoading(false)
      setError(null)

      if (!news_id) {
        setError('News Id is required')
        toast.error('News Id is required')
        return
      }

      try {
        setIsLoading(true)

        const { data, error } = await supabase.rpc('update__news_view', {
          news_id,
        })

        if (error) {
          setError(
            error instanceof Error
              ? error.message
              : t('An unknown error occurred')
          )
          toast.error(
            error instanceof Error
              ? error.message
              : t('An unknown error occurred')
          )
          return
        }
        if (data) {
          setData(data)
          dispatch(incrementNewsView({ news_id }))
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : t('An unknown error occurred')
        )
        toast.error(
          error instanceof Error
            ? error.message
            : t('An unknown error occurred')
        )
      } finally {
        setIsLoading(false)
      }
    },
    [dispatch, t]
  )
  return { updateNewsView, isLoading, error, data }
}
