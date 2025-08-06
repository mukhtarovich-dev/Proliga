'use client'

import * as React from 'react'
import { useSelector } from 'react-redux'
import { selectClubs } from 'lib/features/club/club.selector'
import { useTranslation } from 'react-i18next'
import { Button } from 'components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu'
import { getCorrectName } from 'utils/getCorrectName.util'
import { cn } from 'lib/utils'

const ClubsFilter = ({ column, className }) => {
  const selectedClubs = useSelector(selectClubs)
  const { t } = useTranslation()
  const { lang } = useSelector((store) => store.systemLanguage)
  // Get current filter value from column
  const selectedClubIds = column.getFilterValue() || []

  const handleCheckedChange = (clubId) => {
    const clubIdStr = String(clubId)
    let newIds
    if (selectedClubIds.map(String).includes(clubIdStr)) {
      newIds = selectedClubIds.filter((id) => String(id) !== clubIdStr)
    } else {
      newIds = [...selectedClubIds.map(String), clubIdStr]
    }
    column.setFilterValue(newIds.length ? newIds : undefined)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border-border h-8 w-full justify-start truncate rounded-md border border-dashed px-3 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50',
            className
          )}
        >
          {selectedClubIds.length
            ? `${selectedClubIds.length} ${t('selected')}`
            : t('Hamma_Clublar')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background max-h-96 w-56">
        <DropdownMenuLabel className={'text-foreground'}>
          {t('Hamma_Clublar')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {selectedClubs?.map((club) => (
          <DropdownMenuCheckboxItem
            key={club.id}
            checked={selectedClubIds.map(String).includes(String(club.id))}
            onCheckedChange={() => handleCheckedChange(club.id)}
            className="text-foreground capitalize"
          >
            {getCorrectName({ lang, uz: club?.name, ru: club?.name_ru })}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ClubsFilter
