import { cn } from 'lib/utils'
import { getUrl } from 'utils/static.util'

const MatchTeamDisplay = ({
  name,
  logo,
  isWinner,
  isDraw,
  alignment,
  match,
}) => {
  return (
    <div
      className={cn(
        'xs:gap-x-2 flex h-full w-[35%] items-center gap-x-1',
        alignment === 'right' &&
          'w-1/3 flex-row-reverse items-center space-x-reverse',
        isWinner && 'font-bold'
      )}
    >
      <div
        className={cn(
          'relative',
          isWinner &&
            "after:bg-primary after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:animate-ping after:rounded-full after:opacity-75 after:content-['']",
          isDraw &&
            "after:bg-muted-foreground/80 after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:animate-ping after:rounded-full after:opacity-50 after:content-['']"
        )}
      >
        <img
          src={getUrl(logo)}
          alt={name}
          width={40}
          height={40}
          onError={(e) => (e.currentTarget.src = '/icons/football.svg')}
          className={cn(
            'xs:size-8 size-7 min-w-7 rounded-full',
            isWinner && 'ring-primary ring-2',
            isDraw && 'ring-muted-foreground ring-2'
          )}
        />
      </div>
      <div className="flex max-w-full flex-col truncate text-wrap">
        <span
          className={cn(
            'text-xs break-words md:text-sm',
            alignment === 'left' ? 'text-left' : 'text-right'
          )}
        >
          {name}
        </span>
        {match?.status === 'finished' && (
          <span
            className={cn(
              'text-sm',
              isWinner && 'ring-primary',
              isDraw && 'ring-muted-foreground',
              alignment === 'left' ? 'text-left' : 'text-right'
            )}
          />
        )}
      </div>
    </div>
  )
}

export default MatchTeamDisplay
