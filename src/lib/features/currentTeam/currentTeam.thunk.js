import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'lib/supabaseClient'

export const fetchCurrentTeam = createAsyncThunk(
  'currentTeam/fetchCurrentTeam',
  async ({ id, user_id }) => {
    const { data, error } = await supabase
      .from('team')
      .select('*, competition_id(id, name, name_ru)')
      .eq('id', id)
      .eq('user_id', user_id)
      .is('deleted_at', null)

    if (error) {
      throw error
    }

    return { data }
  }
)

export const fetchSelectedTeam = createAsyncThunk(
  'currentTeam/fetchSelectedTeam',
  async ({ id }) => {
    const { data, error } = await supabase
      .from('team')
      .select('*, competition_id(name, name_ru, id)')
      .eq('id', id)
      .is('deleted_at', null)

    if (error) {
      throw error
    }

    return { data }
  }
)
