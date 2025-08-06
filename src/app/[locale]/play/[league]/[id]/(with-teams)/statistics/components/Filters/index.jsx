import NameFilter from 'components/Table/Filters/Name'
import ClubsFilter from 'components/Table/Filters/Clubs'

function StatisticsTableFilters({ column }) {
  const { filterVariant } = column.columnDef.meta ?? {}
  const columnFilterValue = column.getFilterValue()

  switch (filterVariant) {
    case 'name':
      return (
        <NameFilter
          column={column}
          className={'w-full max-w-64'}
          columnFilterValue={columnFilterValue}
        />
      )
    case 'club':
      return (
        <ClubsFilter
          column={column}
          columnFilterValue={columnFilterValue}
          className="w-full max-w-40"
        />
      )
    default:
      return null
  }
}

export default StatisticsTableFilters
