import { cn } from 'lib/utils'

export const PlayersStructureContainer = ({ children }) => {
  return (
    <section className="animate-in fade-in xs:py-3 absolute top-0 right-0 bottom-0 left-0 z-10 grid grid-rows-4 py-2 duration-300 sm:py-4">
      {children}
    </section>
  )
}
export const DEFContainer = ({ children }) => {
  return (
    <div className="flex w-full items-start justify-evenly">{children}</div>
  )
}

export const MIDContainer = ({ children }) => {
  return <div className="flex items-start justify-evenly">{children}</div>
}

export const STRContainer = ({ children }) => {
  return <div className="flex items-start justify-evenly pt-2">{children}</div>
}

export const GOAContainer = ({ children }) => {
  return (
    <div className="flex w-full items-start justify-center">{children}</div>
  )
}

export const PlayerContainer = ({ children }) => {
  return (
    <div className="text-muted-foreground flex h-min flex-col items-center justify-center text-sm select-none sm:text-base lg:text-sm xl:text-base">
      {children}
    </div>
  )
}
export const PlayerName = ({ children }) => {
  return (
    <p className="text-3xs xs:text-2xs xs:text-xs text-shadow-player line-clamp-1 text-white md:text-sm lg:text-xs xl:text-sm">
      {children}
    </p>
  )
}

export const PlayerImage = ({
  tShirt,
  handleInfoModal,
  imageErr,
  player,
  className,
}) => {
  return (
    <div
      className={cn(
        'xs:size-8 relative size-6 md:size-10 lg:size-8 xl:size-10',
        className
      )}
    >
      <img
        src={tShirt}
        alt="player tshirt"
        onClick={handleInfoModal}
        onError={imageErr}
        draggable={false}
        className="h-full w-full"
      />
      {player.is_captain && (
        <img
          src="/icons/captain-badge.svg"
          alt="captain"
          draggable={false}
          className="absolute -right-1 bottom-0 size-3 md:size-4 2xl:size-5"
        />
      )}
    </div>
  )
}

export const PlayerPoint = ({ children }) => {
  return (
    <div className="bg-primary border-primary-foreground text-primary-foreground flex h-4 w-6 cursor-default items-center justify-center rounded-sm border text-center text-xs font-bold sm:h-5 sm:w-8 md:text-sm">
      {children}
    </div>
  )
}

export const PlayerButtonsContainer = ({ children }) => {
  return (
    <div className="flex items-center gap-0.5 sm:gap-1 lg:gap-0.5 xl:gap-1">
      {children}
    </div>
  )
}

export const PlayerButton = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'hover:border-accent hover:bg-accent border-foreground/50 bg-background group flex size-4 items-center justify-center overflow-hidden rounded-sm border p-0.5 transition-colors sm:size-5 lg:size-4.5 xl:size-5',
        className
      )}
    >
      {children}
    </button>
  )
}
