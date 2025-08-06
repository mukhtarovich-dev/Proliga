import { useState, useCallback } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import { toast } from 'sonner'
import { TOKEN_EXPIRATION_TIME } from 'utils/firebase.utils'
import { setUserToken } from 'lib/features/userToken/userToken.slice'
import { useDispatch } from 'react-redux'

export const useUpdateToken = () => {
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const updateToken = useCallback(async ({ user_id, token, cb = () => { }, device }) => {
        setIsLoading(true)
        setError(null)

        try {
            if (!user_id || !token) {
                setError('Missing required fields')
                toast.error('Missing required fields')
                return
            }

            const { data: user_token, error: newError } = await supabase
                .from('user_token')
                .update({
                    token,
                    expires_at: new Date(Date.now() + TOKEN_EXPIRATION_TIME),
                    device
                })
                .eq('user_id', user_id)
                .eq('token', token)
                .select()
                .single()


            if (newError) {
                setError('Error creating user token')
                // toast.error('Error creating user token')
                return
            }
            dispatch(setUserToken(user_token))
            return cb(user_token)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error creating user token')
            // toast.error(err instanceof Error ? err.message : 'Error creating user token')
        } finally {
            setIsLoading(false)
        }
    }, [dispatch])

    return { updateToken, isLoading, error }
}