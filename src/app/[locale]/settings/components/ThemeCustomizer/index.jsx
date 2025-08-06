import { useTranslation } from 'react-i18next'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'components/ui/card'
import ThemeCustomizerModal from 'shared/ThemeCustomizer'

const ThemeCustomizer = () => {
  const { t } = useTranslation()

  return (
    <Card className="flex w-full flex-col gap-4 px-4">
      <CardHeader className={'flex items-center justify-between p-0'}>
        <CardTitle>{t('Настройки темы')}</CardTitle>
        <ThemeCustomizerModal />
      </CardHeader>
      <CardDescription>
        {t(
          'Персонализируй свою тему при помощи пользовательских тем, цветовых схем и настроек внешнего вида.'
        )}
      </CardDescription>
    </Card>
  )
}

export default ThemeCustomizer
