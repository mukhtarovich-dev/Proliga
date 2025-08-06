import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'lib/supabaseClient'

export const fetchClubs = createAsyncThunk(
  'club/fetchClubs',
  async ({ competition_id }) => {
    const { data, error } = await supabase
      .from('club')
      .select('id, name, slug, name_ru')
      .eq('competition_id', competition_id)
      .order('name')
      .is('deleted_at', null)

    if (error) {
      throw error
    }

    return { data }
  }
)
