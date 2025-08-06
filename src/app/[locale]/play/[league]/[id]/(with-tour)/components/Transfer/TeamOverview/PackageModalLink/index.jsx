import { Card, CardContent } from 'components/ui/card'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { useSelector } from 'react-redux'
import { cn } from 'lib/utils'

const PackageModalLink = ({ item, onClick, children }) => {
  const { teamPackages } = useSelector((store) => store.payExpense)
  const currentTeamPackage = teamPackages[item?.type]

  const isCurrentPackage =
    currentTeamPackage?.pay_package?.priority === item?.priority
  const hasBetterPackage =
    currentTeamPackage?.pay_package?.priority > item?.priority
  const isDisabled = isCurrentPackage || hasBetterPackage

  const baseLinkStyle = `
    border-primary text-foreground relative block h-full w-full justify-start
    rounded-none border-l-4 px-4 py-2 text-left
  `

  return (
    <Card
      className={cn(
        'relative overflow-hidden py-2',
        isCurrentPackage && 'bg-primary/20 border-primary border',
        hasBetterPackage && 'opacity-50'
      )}
    >
      <CardContent className="p-0">
        {isDisabled ? (
          <div className={cn(baseLinkStyle, 'cursor-default')}>
            <div>{children}</div>
            {isCurrentPackage && (
              <CheckCircle className="text-foreground dark:text-primary absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 transform" />
            )}
          </div>
        ) : (
          <Link
            href={`/confirm-payment/${item.id}`}
            onClick={onClick}
            className={cn(baseLinkStyle, 'hover:bg-primary/10')}
          >
            <div>{children}</div>
            <ArrowRight className="text-foreground dark:text-primary absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 transform" />
          </Link>
        )}
      </CardContent>
    </Card>
  )
}

export default PackageModalLink
