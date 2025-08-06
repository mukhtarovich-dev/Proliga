'use client'

import { useTranslation } from 'react-i18next'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'components/ui/card'
import { Switch } from 'components/ui/switch'
import { useState, useEffect } from 'react'
import { selectUser } from 'lib/features/auth/auth.selector'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { setUserToken } from 'lib/features/userToken/userToken.slice'
import { useToggleNotification } from 'hooks/user/useToggleNotification'
import axios from 'axios'

const NotificationToggle = () => {
  const { t } = useTranslation()
  const [permission, setPermission] = useState('default')
  const [isEnabled, setIsEnabled] = useState(false)
  const user = useSelector(selectUser)
  const { userToken } = useSelector((store) => store.userToken)
  const [disabled, setDisabled] = useState(false)
  const dispatch = useDispatch()
  const { toggleNotification } = useToggleNotification()

  const handleTurnOn = async () => {
    try {
      await toggleNotification({
        user_id: user.id,
        notification_enabled: true,
      })
      await axios.post('/api/push-notifications/subscribe', {
        token: userToken?.token,
        topic: 'global',
        user_id: user.id,
      })
      dispatch(setUserToken({ ...userToken, topics: ['global'] }))
      setIsEnabled(true)
      setPermission('granted')
    } catch (error) {
      toast.error(error.message)
      setIsEnabled(false)
    }
  }

  const handleTurnOff = async () => {
    try {
      await toggleNotification({
        user_id: user.id,
        notification_enabled: false,
      })
      await axios.post('/api/push-notifications/unsubscribe', {
        token: userToken?.token,
        topic: 'global',
        user_id: user.id,
      })
      dispatch(setUserToken({ ...userToken, topics: [] }))
      setIsEnabled(false)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleToggle = async (checked) => {
    if (checked) {
      await handleTurnOn()
    } else {
      await handleTurnOff()
    }
  }

  useEffect(() => {
    if (!('Notification' in window)) {
      setDisabled(true)
    } else if (permission === 'denied') {
      setDisabled(true)
    }
  }, [permission])

  useEffect(() => {
    if ('Notification' in window) {
      const permission = Notification.permission
      setPermission(permission)
      if (
        permission === 'granted' &&
        userToken?.token &&
        userToken?.topics?.length > 0
      ) {
        setIsEnabled(true)
      } else {
        setIsEnabled(false)
      }
    }
  }, [userToken?.token, userToken?.topics?.length])

  return (
    <Card className="flex w-full flex-col gap-4 px-4">
      <CardHeader className={'flex items-center justify-between p-0'}>
        <CardTitle>{t('Xabarnomalar')}</CardTitle>
        <Switch
          checked={isEnabled}
          onCheckedChange={handleToggle}
          disabled={disabled}
          className="data-[state=checked]:bg-success data-[state=unchecked]:bg-muted h-5 w-10 cursor-pointer"
          thumbClassName="size-5 data-[state=checked]:translate-x-5"
        />
      </CardHeader>
      <CardDescription>
        {t(
          'Получайте уведомление о важных новостях, сообщениях, и действиях в режиме реального времени'
        )}
      </CardDescription>
    </Card>
  )
}

export default NotificationToggle
