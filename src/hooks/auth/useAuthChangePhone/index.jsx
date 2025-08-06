import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import { useSendOTP } from '../useSendOTP'
import { useSession } from 'next-auth/react'
import axios from 'axios'

export const useAuthChangePhone = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const { sendOTP } = useSendOTP()
  const { t } = useTranslation()
  const { update } = useSession()

  const handleError = useCallback(
    (errorMessage) => {
      setError(errorMessage)
      toast.error(t(errorMessage))
    },
    [t]
  )

  // Step 5 Confirm otp for new phone
  const updatePhone = useCallback(
    async ({
      phone_new,
      id,
      phone,
      password,
      fingerprint,
      geo,
      agent,
      cb = () => {},
    }) => {
      setError(null)
      setData(null)

      if (!phone_new || !password || !id || !phone) {
        handleError("Barcha maydonlar to'ldirilishi shart")
      }

      try {
        setIsLoading(true)

        // Step 1 Check Phone doesn't exist
        const { data: checkData, error: checkError } = await supabase.rpc(
          'get__check_user_not_exist',
          {
            phone_num: phone_new,
          }
        )

        if (checkError) {
          return handleError(
            checkError instanceof Error
              ? checkError.message
              : 'An unknown error occurred'
          )
        }
        if (checkData?.status === 200) {
          return handleError("Bu telefon raqam oldin ro'yxatdan o'tgan")
        }
        if (checkData?.status !== 404) {
          return handleError('An unknown error occurred')
        }

        // Step 2: Verify password using custom API route
        const verifyRes = await axios.post('/api/verify-password', {
          phone,
          password,
        })

        const verifyData = verifyRes.data
        console.log('verifyData', verifyData)
        if (!verifyData.success) {
          return handleError(
            verifyData?.error || 'Parol noto‘g‘ri yoki foydalanuvchi topilmadi'
          )
        }

        // Step 3 Set new phone to new_phone col
        const obj = {
          visitor: fingerprint,
          visited_at: new Date(),
          geo,
          agent,
          phone_new,
        }
        const { error: fullUserError } = await supabase
          .from('user')
          .update(obj)
          .eq('id', id)
          .is('deleted_at', null)
          .single()

        if (fullUserError) {
          return handleError(
            fullUserError instanceof Error
              ? fullUserError.message
              : 'An unknown error occurred'
          )
        }
        // Step 4 Send OTP new phone
        const status = await sendOTP({ phone: phone_new, is_update: true })

        if (status?.error) {
          return handleError(status.error.message)
        }

        await update(obj)
        cb()
        return true
      } catch (error) {
        handleError(
          error instanceof Error ? error.message : 'An unknown error occurred'
        )
      } finally {
        setIsLoading(false)
      }
    },
    [handleError, sendOTP, update]
  )

  return { updatePhone, isLoading, error, data }
}
