import { PACKAGE_TYPE } from 'utils/packages.util'
import { Card, CardHeader, CardContent, CardTitle } from 'components/ui/card'
import { Separator } from 'components/ui/separator'
import { Skeleton } from 'components/ui/skeleton'
import { Zap, Users, CircleDollarSign } from 'lucide-react'

const PackageIcon = ({ type }) => {
  switch (type) {
    case PACKAGE_TYPE.team_balance:
      return <CircleDollarSign className="text-accent h-6 w-6" />
    case PACKAGE_TYPE.transfer_count:
      return <Zap className="text-accent h-6 w-6" />
    case PACKAGE_TYPE.single_club_count:
      return <Users className="text-accent h-6 w-6" />
    default:
      return null
  }
}

const PackagesSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="mx-auto mb-8 h-10 w-3/5" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(PACKAGE_TYPE).map((packageType) => (
          <Card
            key={packageType}
            className="border-accent bg-card hover:border-accent gap-0 transition-all"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground text-xl font-bold">
                  <Skeleton className="h-6 w-24" />
                </CardTitle>
                <PackageIcon type={packageType} />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <Separator className="bg-accent/20 mb-4" />
              <div className="space-y-4">
                {[1, 2, 3].map((item, index) => (
                  <div
                    key={index}
                    className="bg-card hover:bg-secondary flex items-center justify-between rounded-sm p-2 transition-all"
                  >
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-6 w-12" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-9 w-20" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default PackagesSkeleton
