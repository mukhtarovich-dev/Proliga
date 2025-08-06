'use client'

import { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useUpdateUserLocation } from 'hooks/user/useUpdateUserLocation'

const GeolocationProvider = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  const { updateLocation } = useUpdateUserLocation()
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    const requestGeolocationPermission = async () => {
      if (!navigator.geolocation) {
        return
      }

      const permission = await navigator.permissions.query({
        name: 'geolocation',
      })

      if (permission.state === 'denied') {
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords

          if (!user?.location) {
            return updateLocation({
              location: JSON.stringify(position),
              user,
            })
          }

          const userCoords = JSON.parse(user?.location).coords

          if (
            latitude !== userCoords?.latitude ||
            longitude !== userCoords?.longitude
          ) {
            updateLocation({
              location: JSON.stringify(position),
              user,
            })
          }
        },
        (error) => {
          console.log('Error requesting geolocation permission:', error)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      )
    }

    try {
      if (user?.id && Boolean(isAuthenticated) && !isUpdated) {
        requestGeolocationPermission()
        setIsUpdated(true)
      }
    } catch (error) {
      console.log('Error requesting geolocation permission:', error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, isUpdated, updateLocation])

  return <>{children}</>
}

export default memo(GeolocationProvider)
