import { supabase } from 'lib/supabaseClient'
import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'

export const useToggleNotification = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { t } = useTranslation()
    const { update } = useSession()

    const toggleNotification = useCallback(
        async ({
            user_id,
            notification_enabled,
            cb = () => { },
        }) => {

            if (!user_id) {
                setError('User not authenticated')
                return toast.error(t('Foydalanuvchi autentifikatsiya qilinmagan'))
            }

            try {
                setIsLoading(true)
                setError('')


                const { data, error } = await supabase
                    .from('user')
                    .update({ notification_enabled })
                    .eq('id', user_id)
                    .is('deleted_at', null)
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
                    return { error, data }
                }

                cb()
                await update({ notification_enabled })
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
        [t, update]
    )
    return { toggleNotification, isLoading, error }
}
