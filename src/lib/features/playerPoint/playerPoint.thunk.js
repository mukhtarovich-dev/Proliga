import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'lib/supabaseClient'

export const fetchPlayerPoint = createAsyncThunk(
  'playerPoint/fetchPlayerPoint',
  async ({ competition_id, tour_id, teamConcat }) => {
    const playerIds = teamConcat.map((p) => (p.name && p.player_id) || 0)

    const { data, error } = await supabase
      .from('player_point')
      .select(
        'id, point, player_id, match_id(*), player_result_id(*), tour_id(id, name,name_ru)'
      )
      .eq('competition_id', competition_id)
      .eq('tour_id', tour_id)
      .in('player_id', playerIds)
      .is('deleted_at', null)

    if (error) {
      throw error
    }

    return { data }
  }
)
