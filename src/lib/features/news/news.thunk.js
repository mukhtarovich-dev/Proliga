import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'lib/supabaseClient'

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ page = 0, perPage = 8 }) => {
    let from = page * perPage
    let to = from + perPage - 1

    const { data, error, count } = await supabase
      .from('news')
      .select('*', { count: 'estimated' })
      .range(from, to)
      .is('deleted_at', null)
      .order('published_at', { ascending: false })

    if (error) {
      throw error
    }

    return { data, count }
  }
)
