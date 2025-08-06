import PositionsFilter from './Positions'
import NameFilter from 'components/Table/Filters/Name'
import ClubsFilter from 'components/Table/Filters/Clubs'
import PriceFilter from 'components/Table/Filters/Price'
import { memo } from 'react'

function TransferTableFilters({ column }) {
  const { filterVariant } = column.columnDef.meta ?? {}
  const columnFilterValue = column.getFilterValue()

  switch (filterVariant) {
    case 'name':
      return (
        <NameFilter column={column} columnFilterValue={columnFilterValue} />
      )
    case 'club':
      return (
        <ClubsFilter column={column} columnFilterValue={columnFilterValue} />
      )
    case 'price':
      return (
        <PriceFilter column={column} columnFilterValue={columnFilterValue} />
      )
    case 'position':
      return (
        <PositionsFilter
          column={column}
          columnFilterValue={columnFilterValue}
        />
      )
    default:
      return null
  }
}

export default memo(TransferTableFilters)
