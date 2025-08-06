import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'lib/supabaseClient'

export const fetchPayExpenses = createAsyncThunk(
  'payExpense/fetchPayBalance',
  async ({ user_id }) => {
    const { data, error } = await supabase
      .from('pay_expense')
      .select(
        '*, pay_package_id(id, name_uz, name_ru, type, amount), team_id(id, name)'
      )
      .eq('user_id', user_id)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return { data }
  }
)

export const fetchTeamPackages = createAsyncThunk(
  'payExpense/fetchTeamPackages',
  async ({ user_id, team_id }) => {
    const { data, error } = await supabase
      .from('pay_expense')
      .select(
        'user_id, team_id, pay_package_type, status, amount, pay_package(name_uz, name_ru, priority)'
      )
      .eq('user_id', user_id)
      .eq('team_id', team_id)
      .is('deleted_at', null)
      .eq('status', 1)

    if (error) {
      throw error
    }

    return { data }
  }
)
