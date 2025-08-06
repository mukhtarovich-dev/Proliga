'use client'

import BalanceTable from './components/BalanceTable'
import PackagesTable from './components/PackagesTable'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { fetchPayBalance } from 'lib/features/payBalance/payBalance.thunk'
import { fetchPayExpenses } from 'lib/features/payExpense/payExpense.thunk'
import { selectUser } from 'lib/features/auth/auth.selector'
import { Wallet, Boxes, RefreshCcw } from 'lucide-react'
import { selectExpenses } from 'lib/features/payExpense/payExpense.selector'
import { selectBalances } from 'lib/features/payBalance/payBalance.selector'
import { Button } from 'components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs'

const CabinetTransactionsHistory = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [currentTab, setCurrentTab] = useState(TRANSACTION_TABS.BALANCE)
  const user = useSelector(selectUser)
  const expenses = useSelector(selectExpenses)
  const balances = useSelector(selectBalances)

  useEffect(() => {
    if (user?.id && expenses?.length === 0 && balances?.length === 0) {
      Promise.all([
        dispatch(fetchPayBalance({ user_id: user?.id })),
        dispatch(fetchPayExpenses({ user_id: user?.id })),
      ])
    }
  }, [dispatch, user, expenses?.length, balances?.length])

  const refreshData = () => {
    switch (currentTab) {
      case TRANSACTION_TABS.BALANCE:
        return dispatch(fetchPayBalance({ user_id: user?.id }))
      case TRANSACTION_TABS.EXPENSES:
        return dispatch(fetchPayExpenses({ user_id: user?.id }))
      default:
        break
    }
  }

  return (
    <Tabs
      defaultValue={TRANSACTION_TABS.BALANCE}
      className="flex h-full w-full flex-col"
      onValueChange={(value) => setCurrentTab(value)}
    >
      <div className="mb-2 flex flex-col gap-2 sm:mb-0 sm:justify-between justify-center md:flex-row">
        <h3 className="text-foreground text-xl font-bold tracking-tight">
          {t('Xarajatlar tarixi')}
        </h3>

        <TabsList className="w-full sm:w-auto">
          <TabsTrigger className="w-40" value={TRANSACTION_TABS.BALANCE}>
            <Wallet className="mr-2 h-4 w-4" />
            {t('Balans')}
          </TabsTrigger>
          <TabsTrigger className="w-40" value={TRANSACTION_TABS.EXPENSES}>
            <Boxes className="mr-2 h-4 w-4" />
            {t('Paketlar')}
          </TabsTrigger>
        </TabsList>
        <Button
          onClick={refreshData}
          variant="outline"
          size="icon"
          className="text-foreground/80 hover:text-foreground hidden items-center justify-center gap-1 self-end p-0 text-sm md:flex"
        >
          <RefreshCcw className="text-foreground size-4" />
        </Button>
      </div>
      <TabsContent
        className={'flex min-h-128 flex-col justify-between'}
        value={TRANSACTION_TABS.BALANCE}
      >
        <BalanceTable />
      </TabsContent>
      <TabsContent
        value={TRANSACTION_TABS.EXPENSES}
        className={'flex min-h-128 flex-col justify-between'}
      >
        <PackagesTable />
      </TabsContent>
    </Tabs>
  )
}

const TRANSACTION_TABS = {
  BALANCE: 'balance',
  EXPENSES: 'expenses',
}

export default CabinetTransactionsHistory
