import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog'
import { useSelector } from 'react-redux'
import { getCorrectName } from 'utils/getCorrectName.util'
import { ScrollArea } from 'components/ui/scroll-area'
import { DialogDescription } from '@radix-ui/react-dialog'

const NotificationModal = ({ isOpen, onOpenChange, notification }) => {
  const { lang } = useSelector((store) => store.systemLanguage)
  if (!notification) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl rounded-xl">
        <DialogHeader>
          <DialogTitle>
            {getCorrectName({
              lang,
              uz: notification?.name,
              ru: notification?.name_ru,
            })}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="modal-news bg-background max-h-[70vh] min-w-full rounded-sm">
          <div
            className="w-full max-w-none bg-transparent px-2 py-3"
            dangerouslySetInnerHTML={{
              __html: getCorrectName({
                lang,
                uz: notification?.desc,
                ru: notification?.desc_ru,
              }),
            }}
          />
        </ScrollArea>
        <DialogDescription className="hidden">
          This is a notification
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default NotificationModal
