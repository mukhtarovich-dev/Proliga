import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'lib/supabaseClient'

export const fetchTours = createAsyncThunk(
  'tours/fetchTours',
  async ({ competition_id, registered_tour_id }) => {
    const { data, error } = await supabase
      .from('tour')
      .select('*')
      .eq('competition_id', competition_id)
      .is('deleted_at', null)
      .order('order', { ascending: true })

    if (error) {
      throw error
    }

    return { data, registered_tour_id }
  }
)

export const fetchTeamViewTours = createAsyncThunk(
  'tours/fetchTeamViewTours',
  async ({ competition_id, registered_tour_id }) => {
    const { data, error } = await supabase
      .from('tour')
      .select('*')
      .eq('competition_id', competition_id)
      .is('deleted_at', null)
      .order('order', { ascending: true })

    if (error) {
      throw error
    }

    return { data, registered_tour_id }
  }
)
