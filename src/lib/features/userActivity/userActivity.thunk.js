import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'lib/supabaseClient'

export const fetchUserActivity = createAsyncThunk(
  'userActivity/fetchUserActivity',
  async ({ competition_id, user_id, team_id, page, perPage }) => {
    let from = page * perPage
    let to = from + perPage - 1

    const { data, error, count } = await supabase
      .from('user_activity')
      .select('id,name_uz, name_ru, created_at', { count: 'estimated' })
      .eq('user_id', user_id)
      .eq('competition_id', competition_id)
      .eq('team_id', team_id)
      .range(from, to)
      .is('deleted_at', null)

    if (error) {
      throw error
    }

    return { data, count }
  }
)
