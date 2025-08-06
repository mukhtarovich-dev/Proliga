import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { NumericFormat } from 'react-number-format'
import { selectUser } from 'lib/features/auth/auth.selector'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from 'components/ui/card'
import { Button } from 'components/ui/button'
import { ArrowUpCircle, Wallet } from 'lucide-react'
import RefillBalanceModal from 'shared/RefillBalanceModal'
import { useEffect, useState } from 'react'
import { supabase } from 'lib/supabaseClient'

const RefillBalance = () => {
  const { t } = useTranslation()
  const user = useSelector(selectUser)
  const [isModalOpen, setModalOpen] = useState(false)
  const [balance, setBalance] = useState(user?.balance / 100 || 0)

  useEffect(() => {
    const fetchBalance = async () => {
      const { data, error } = await supabase
        .from('user')
        .select('balance')
        .eq('id', user?.id)
        .single()

      if (error instanceof Error) {
        console.error(error.message)
      }

      setBalance(data?.balance / 100 || 0)
    }
    fetchBalance()
  }, [user?.id])

  return (
    <Card className="w-full gap-4">
      <RefillBalanceModal
        setIsModalOpen={setModalOpen}
        isModalOpen={isModalOpen}
      />
      <CardHeader className="relative flex items-center px-4">
        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
          <Wallet className="text-foreground h-4 w-4" />
        </div>
        <CardTitle className="text-sm font-semibold">{t('Balans')}</CardTitle>
      </CardHeader>

      <CardContent className={'px-4'}>
        <NumericFormat
          value={balance}
          className="text-foreground w-full border-none bg-transparent text-right text-lg font-bold outline-hidden select-none"
          defaultValue={0}
          readOnly
          thousandSeparator
          fixedDecimalScale
          decimalScale={2}
          tabIndex={-1}
          suffix={' ' + t('UZS')}
        />
      </CardContent>

      <CardFooter className={'px-4'}>
        <Button
          onClick={() => setModalOpen(true)}
          size="lg"
          className="group border-border bg-primary text-primary-foreground hover:bg-primary/90 relative w-full overflow-hidden border transition-all duration-300 hover:shadow-lg"
        >
          <ArrowUpCircle className="h-5 w-5 transition-transform" />
          <span className="font-semibold">{t('Balansni toldirish')}</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default RefillBalance
