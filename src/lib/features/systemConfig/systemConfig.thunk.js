import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'lib/supabaseClient'
import { CONFIG_KEY } from 'utils/config.util'

export const fetchSystemConfig = createAsyncThunk(
  'systemConfig/fetchSystemConfig',
  async () => {
    const configKeys = Object.keys(CONFIG_KEY).map((key) => key)

    const { data, error } = await supabase
      .from('system_config')
      .select('key, value, type')
      .in('key', configKeys)

    if (error) {
      throw error
    }

    return { data }
  }
)
