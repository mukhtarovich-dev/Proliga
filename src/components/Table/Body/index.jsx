import { cn } from 'lib/utils'
import { TableBody, TableRow, TableCell } from 'components/ui/table'

const Body = ({ table, flexRender, className, rowClassName }) => {
  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} className={cn('', className)}>
          {row.getVisibleCells().map((cell) => (
            <TableCell
              className={cn(
                'text-2xs text-center sm:text-start sm:text-xs xl:text-sm',
                rowClassName
              )}
              key={cell.id}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}

export default Body
