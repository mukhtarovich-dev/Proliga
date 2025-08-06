import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchGeo = createAsyncThunk('auth/fetchGeo', async () => {
  const response = await axios.get(
    // eslint-disable-next-line no-undef
    process.env.NEXT_PUBLIC_URL + '/api/geoip'
  )
  if (response.status !== 200) {
    throw new Error('Failed to fetch geolocation data')
  }
  const data = await response.json()

  return { data }
})
