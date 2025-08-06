import { supabase } from 'lib/supabaseClient'
import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { setUserTable } from 'lib/features/auth/auth.slice'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'

export const useUpdateUserPhoto = () => {
  const { update } = useSession()
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  const updateUserPhoto = useCallback(
    async ({ path, cb = () => {}, user }) => {
      try {
        setIsLoading(true)
        setError('')

        if (!path) {
          setError(t('Rasmni tanlang'))
          toast.warning(t('Rasmni tanlang'))
          return
        }

        if (!user?.id) {
          setError('User not authenticated')
          toast.error(t('Foydalanuvchi autentifikatsiya qilinmagan'))
          return
        }

        const { data, error } = await supabase
          .from('user')
          .update({
            image: path,
          })
          .eq('id', user?.id)
          .is('deleted_at', null)
          .select(
            'id, name, email, phone, image, last_name, middle_name, gender, birth_date, bio, balance, deleted_at, language, phone_verified'
          )
          .single()

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
          dispatch(setUserTable(data))
          toast.success(t('Rasm muvofaqiyatli yuklandi'))
          await update({ image: path })
          cb()
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
    [dispatch, t, update]
  )
  return { updateUserPhoto, isLoading, error }
}
