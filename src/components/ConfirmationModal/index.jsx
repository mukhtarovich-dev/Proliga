import { useTranslation } from 'react-i18next'
import {
  DialogContent,
  Dialog,
  DialogTitle,
  DialogDescription,
} from 'components/ui/dialog'
import { Button } from 'components/ui/button'

const Confirmation = ({ onConfirm, onCancel, isModalOpen, setModalOpen }) => {
  const { t } = useTranslation()

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="bg-background text-foreground xs:max-w-96 flex max-w-[96%] flex-col items-center justify-between gap-2 rounded-xl p-6 md:max-w-max xl:max-w-120">
        <DialogTitle className="mt-6 mb-12 cursor-default text-xl font-bold md:tracking-wide">
          {t('Ishonchingiz komilmi')}
        </DialogTitle>
        <div className="flex items-center gap-1">
          <Button
            className="border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/80 focus:outline-foreground h-auto w-36 rounded-md border-2 py-2 font-medium transition-all select-none md:w-44"
            onClick={onConfirm}
            tabIndex={0}
            autoFocus={true}
          >
            {t('Tasdiqlash')}
          </Button>
          <Button
            className="border-secondary bg-secondary text-foreground hover:border-secondary/80 hover:bg-secondary/80 hover:text-secondary-foreground h-auto w-36 rounded-md border-2 py-2 font-medium transition-all select-none md:w-44"
            onClick={onCancel}
          >
            {t('Qaytish')}
          </Button>
        </div>
        <DialogDescription className="hidden">
          {t('Ishonchingizni tasdiqlaysizmi')}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default Confirmation
