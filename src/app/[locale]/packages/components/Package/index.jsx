import { Card, CardHeader, CardContent, CardTitle } from 'components/ui/card'
import { Zap, Users, Coins, CheckCircle } from 'lucide-react'
import { Button } from 'components/ui/button'
import { Link } from 'next-view-transitions'
import { Separator } from 'components/ui/separator'
import { Badge } from 'components/ui/badge'
import { PACKAGE_TYPE } from 'utils/packages.util'
import { useSelector } from 'react-redux'
import { selectPackages } from 'lib/features/package/package.selector'
import { cn } from 'lib/utils'

const PackageContainer = ({ packageType, t }) => {
  const packages = useSelector(selectPackages)
  const { teamPackages } = useSelector((store) => store.payExpense)
  const currentTeamPackage = teamPackages[packageType]

  const getPackageTitle = (type) => {
    switch (type) {
      case PACKAGE_TYPE.team_balance:
        return t('Balans')
      case PACKAGE_TYPE.transfer_count:
        return t('Transfer')
      case PACKAGE_TYPE.single_club_count:
        return t('Bir jamoa oyinchilari')
      default:
        return ''
    }
  }

  return (
    <Card className="border-accent/50 hover:border-accent gap-0 shadow transition-all">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl font-bold">
          {getPackageTitle(packageType)}
        </CardTitle>
        <PackageIcon type={packageType} />
      </CardHeader>
      <CardContent className="space-y-0 pt-4">
        <Separator className="bg-accent/20 mb-4" />
        <div className="space-y-4">
          {packages?.length > 0 &&
            packages
              .filter((item) => item.type === packageType)
              .map((item, index) => {
                const isCurrentPackage =
                  currentTeamPackage?.pay_package?.priority === item?.priority
                const hasBetterPackage =
                  currentTeamPackage?.pay_package?.priority > item?.priority
                const isDisabled = isCurrentPackage || hasBetterPackage

                return (
                  <div
                    key={index}
                    className={cn(
                      'bg-card flex items-center justify-between rounded-sm p-2 shadow transition-all',
                      isCurrentPackage && 'bg-primary/20 border-primary border',
                      hasBetterPackage && 'opacity-50',
                      !isDisabled && 'hover:bg-secondary'
                    )}
                  >
                    <div className="flex cursor-default items-center space-x-2">
                      <Badge
                        variant="outline"
                        className="bg-foreground/70 dark:bg-primary/15 border-accent text-accent border"
                      >
                        {item.amount}
                      </Badge>
                      <span className="text-muted-foreground text-sm">
                        {t('ga oshirish')}
                      </span>
                    </div>
                    {isDisabled ? (
                      isCurrentPackage && (
                        <CheckCircle className="text-foreground dark:text-accent mr-2 h-5 w-5" />
                      )
                    ) : (
                      <Button asChild size="sm">
                        <Link href={`/confirm-payment/${item.id}`}>
                          {t('Tanlash')}
                        </Link>
                      </Button>
                    )}
                  </div>
                )
              })}
        </div>
      </CardContent>
    </Card>
  )
}

const PackageIcon = ({ type }) => {
  switch (type) {
    case PACKAGE_TYPE.team_balance:
      return <Coins className="text-foreground dark:text-accent h-6 w-6" />
    case PACKAGE_TYPE.transfer_count:
      return <Zap className="text-foreground dark:text-accent h-6 w-6" />
    case PACKAGE_TYPE.single_club_count:
      return <Users className="text-foreground dark:text-accent h-6 w-6" />
    default:
      return null
  }
}

export default PackageContainer
