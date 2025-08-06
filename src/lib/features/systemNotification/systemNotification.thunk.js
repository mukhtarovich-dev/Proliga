import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'lib/supabaseClient'

export const fetchBroadcastNotifications = createAsyncThunk(
  'systemNotification/fetchBroadcastNotifications',
  async () => {
    const { data, error } = await supabase
      .from('system_notification')
      .select('*')
      .eq('is_broadcast', true)
      .is('deleted_at', null)
      .order('created_at', { ascending: true })

    if (error) {
      throw error
    }

    return { data }
  }
)

export const fetchPersonalNotifications = createAsyncThunk(
  'systemNotification/fetchPersonalNotifications',
  async ({ user_id }) => {
    const { data, error } = await supabase
      .from('system_notification')
      .select('*')
      .is('is_broadcast', false)
      .eq('user_id', user_id)
      .is('deleted_at', null)
      .order('created_at', { ascending: true })

    if (error) {
      throw error
    }

    return { data }
  }
)
