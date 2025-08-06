import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'lib/supabaseClient'

export const fetchMatches = createAsyncThunk(
  'matches/fetchMatches',
  async ({ season_id, competition_id, tour_id, page = 0, perPage = 7 }) => {
    let from = page * perPage
    let to = from + perPage - 1

    const { data, error, count } = await supabase
      .from('match')
      .select(
        'status, match_min, additional_min, home_club_result, away_club_result, winner_club_id, started_date, finished_date, home_club_id:club!home_club_id(name, slug, id, name_ru, logo_img), away_club_id:club!away_club_id(name, slug, id, name_ru, logo_img), id',
        { count: 'estimated' }
      )
      .eq('season_id', season_id)
      .eq('competition_id', competition_id)
      .eq('tour_id', tour_id)
      .is('deleted_at', null)
      .range(from, to)
      .order('started_date', { ascending: true })

    if (error) {
      throw error
    }

    return { data, count }
  }
)
