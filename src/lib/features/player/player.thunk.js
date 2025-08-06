import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'lib/supabaseClient'

export const fetchPlayers = createAsyncThunk(
  'players/fetchPlayers',
  async ({ competition_id }) => {
    const { data, error, count } = await supabase
      .from('player')
      .select('*, club(id, name, slug, name_ru, logo_img, form_img)', { count: 'estimated' })
      .eq('competition_id', competition_id)
      .is('deleted_at', null)
      .limit(1000)

    if (error) {
      throw error
    }

    return { data, count }
  }
)
export const fetchAdditionalPlayers = createAsyncThunk(
  'players/fetchAdditionalPlayers',
  async ({ competition_id, page }) => {
    let from = page * 1000
    let to = from + 1000 - 1

    const { data, error } = await supabase
      .from('player')
      .select('*, club(id, name, slug, name_ru, logo_img)')
      .eq('competition_id', competition_id)
      .is('deleted_at', null)
      .limit(1000)
      .range(from, to)

    if (error) {
      throw error
    }

    return { data, page: page * 1000 }
  }
)

export const fetchTopPlayers = createAsyncThunk(
  'players/fetchTopPlayers',
  async ({ competition_id }) => {
    const { data, error } = await supabase
      .rpc('get__player_point_desc', {
        comp_id: competition_id,
      })
      .limit(3)

    if (error) {
      throw error
    }

    return { data }
  }
)
