import { useSelector } from 'react-redux'
import { getCorrectName } from 'utils/getCorrectName.util'
import { formatDate } from 'utils/formatDate.util'

const NotificationArticle = ({ notification, handleNotificationClick }) => {
  const { lang } = useSelector((store) => store.systemLanguage)
  const date = new Date(notification?.published_at ?? new Date())

  return (
    <div
      className="hover:bg-accent border-border flex items-start space-x-4 border-b px-4 py-2 transition-colors"
      role="button"
      onClick={() => handleNotificationClick(notification)}
      tabIndex={0}
    >
      <div className="flex-1 space-y-1">
        <p className="text-foreground text-sm leading-none font-medium">
          {getCorrectName({
            lang,
            uz: notification?.name,
            ru: notification?.name_ru,
          })}
        </p>
        <p className="text-muted-foreground text-xs">
          {formatDate(date, 'notifications')}
        </p>
      </div>
    </div>
  )
}

export default NotificationArticle
