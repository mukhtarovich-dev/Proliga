import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'lib/supabaseClient'

export const fetchTourTeams = createAsyncThunk(
  'tours/fetchTourTeams',
  async ({ team_id, currentTour }) => {
    const { data, error } = await supabase
      .from('tour_team')
      .select('*, user_id(name), team(*)')
      .eq('team_id', team_id)
      .is('deleted_at', null)
      .order('tour_id', { ascending: true })

    if (error) {
      throw error
    }

    return { data, currentTour }
  }
)

export const fetchAllTeams = createAsyncThunk(
  'teams/fetchAllTeams',
  async ({ season_id, competition_id, page, perPage, tour_id }) => {
    let from = page * perPage
    let to = from + perPage - 1

    const { data, error, count } = await supabase
      .from('tour_team')
      .select(
        '*, user_id(name), team!inner(id, name, order, point), tour_id(id, order))',
        { count: 'estimated' }
      )
      .eq('season_id', season_id)
      .eq('competition_id', competition_id)
      .eq('tour_id', tour_id)
      .is('deleted_at', null)
      .order('team(order)', {
        ascending: true,
      })
      .range(from, to)

    if (error) {
      throw error
    }

    return { data, count }
  }
)

export const searchAllTeams = createAsyncThunk(
  'teams/searchAllTeams',
  async ({ season_id, competition_id, page, perPage, searchTerm, tour_id }) => {
    const from = page * perPage
    const to = from + perPage - 1

    const { data, error, count } = await supabase
      .from('tour_team')
      .select(
        '*, user_id(name), team!inner(id, name, order, point), tour_id(id, order)',
        { count: 'planned' }
      )
      .eq('season_id', season_id)
      .eq('competition_id', competition_id)
      .eq('tour_id', tour_id)
      .range(from, to)
      .is('deleted_at', null)
      .ilike('team.name', `%${searchTerm}%`)

    if (error) {
      throw error
    }

    return { data, count }
  }
)
