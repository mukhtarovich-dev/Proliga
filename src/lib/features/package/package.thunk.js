import { supabase } from 'lib/supabaseClient'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPackages = createAsyncThunk(
  'packages/fetchPackages',
  async () => {
    const { data, error } = await supabase
      .from('pay_package')
      .select('*')
      .is('deleted_at', null)

    if (error) {
      throw error
    }

    return { data }
  }
)
