import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'lib/supabaseClient'

export const fetchSeason = createAsyncThunk('season/fetchSeason', async () => {
  const { data, error } = await supabase
    .from('season')
    .select('id, name, active')
    .eq('active', 'TRUE')
    .is('deleted_at', null)

  if (error) {
    throw error
  }

  return { data }
})
