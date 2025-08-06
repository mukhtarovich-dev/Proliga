import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'lib/supabaseClient'

export const fetchUserTokens = createAsyncThunk(
    'auth/fetchUserTokens',
    async ({ user_id }) => {
        const now = new Date();
        const isoTimestamp = now.toISOString().replace('T', ' ').replace('Z', '+00');
        const { data, error } = await supabase
            .from('user_token')
            .select('*')
            .eq('user_id', user_id)
            .gt('expires_at', isoTimestamp)

        if (error) {
            throw error
        }

        return { data }
    }
)
