import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'lib/supabaseClient'

export const fetchPayBalance = createAsyncThunk(
  'payBalance/fetchPayBalance',
  async ({ user_id }) => {
    const { data, error } = await supabase
      .from('pay_balance')
      .select('*')
      .order('created_at', { ascending: false })
      .eq('user_id', user_id)
      .is('deleted_at', null)

    if (error) {
      throw error
    }

    return { data }
  }
)
